import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/api/db/mongoDb';

export async function POST(request: Request) {
    /** ### 요청에서 form 데이터 추출 */
    const data = await request.json();
    /**
     * ### 개별 폼 데이터 요소 추출
     * name : 이름
     * email : 이메일 주소
     * password : 비밀번호
     * student_number : 학번
     * phone : 전화번호
     */
    const {
        email,
        username,
        password,
        student_number,
        phone
    } = data;

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

        // 비밀번호 해시값 생성에서 오류 발생
        //원인: saltRounds의 값이 25일 경우, 해싱하는데에 2GHz core의 서버에서 1시간이 소요됨.
        // const pwdHash: any = await bcrypt.hash(password, 25);
        /**
         * saltRounds=8: 약 0.025 초
         * saltRounds=9: 약 0.05 초
         * saltRounds=10: 약 0.1 초
         * saltRounds=11: 약 0.2 초
         * saltRounds=12: 약 0.4 초
         * saltRounds=13: 약 1초
         * saltRounds=14: 약 1.5초
         * saltRounds=15: 약 3초
         * saltRounds=25: 약 1시간
         * saltRounds=31: 약 2~3일
         * */
        const pwdHash: string = await  bcrypt.hash(password, 12);

        // 회원정보 데이터베이스에 저장
        const user = await db.collection(process.env.MONGODB_USER as string).insertOne({
            email,
            username,
            student_number,
            phone,
            password: pwdHash,
            role: 'customer',
        });
        console.log(user)
        /**
         * ### 성공 응답 반환
         * - 성공 메시지를 변경하거나 사용자에게 반환할 추가 정보를 추가가능
         */
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Registration successful.',
            user: user,
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