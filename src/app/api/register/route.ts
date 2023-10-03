import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/api/db/mongoDb';

export async function POST(request: Request) {
    /** ### 요청에서 form 데이터 추출 */
    const formData = await request.formData();
    /**
     * ### 개별 폼 데이터 요소 추출
     * name : 이름
     * email : 이메일 주소
     * password : 비밀번호
     * student_number : 학번
     * phone : 전화번호
     */
    const username = formData.get('name');
    const email = formData.get('email');
    /** ### password 해싱으로 인한 임시타입 : any */
    const password: any = formData.get('password');
    const student_number = formData.get('student_number');
    const phone = formData.get('phone');

    // 입력 값 검증
    if (!username || !email || !password || !student_number || !phone) {
        return NextResponse.json({
            success: false,
            status: 400,
            message: 'All fields are required.'
        });
    }

    try {
        // 데이터베이스 연결
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);

        // 이메일 중복 확인
        const existingUser = await db.collection(process.env.MONGODB_USER as string).findOne({email});
        if (existingUser) {
            return NextResponse.json({
                success: false,
                status: 409,
                message: 'Email is already in use.'
            })
        }

        // 비밀번호 해시값 생성
        const pwdHash: any = await bcrypt.hash(password, 25);

        // 회원정보 데이터베이스에 저장
        await db.collection(process.env.MONGODB_USER as string).insertOne({
            email,
            username,
            student_number,
            phone,
            password: pwdHash,
            role: 'customer',
        });
        /**
         * ### 성공 응답 반환
         * - 성공 메시지를 변경하거나 사용자에게 반환할 추가 정보를 추가가능
         */
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Registration successful.'
        });
    } catch (err) {
        /** ### 에러 처리 */
        if (err instanceof Error) {
            /** ### 알려진 에러 처리 */
            return NextResponse.json({
                success: false,
                status: 500,
                message: 'Server or network error',
                error: err.message
            });
        } else {
            /** ### 알수없는 에러 처리 */
            return NextResponse.json({
                success: false,
                status: 500,
                message: 'Server or network error',
                error: "Unknown error"
            });
        }
    }
}