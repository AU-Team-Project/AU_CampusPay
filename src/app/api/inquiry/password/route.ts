import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    /** ### 요청에서 form 데이터 추출 */
    const data = await request.json();
    /**
     * ### 개별 폼 데이터 요소 추출
     * email : 이메일 주소
     */
    const {
        email
    } = data;

    // 입력 값 검증
    if (!email) {
        return NextResponse.json({
            success: false,
            status: 400,
            message: 'Email field is empty'
        });
    }

    try {
        // 데이터베이스 연결
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);
        // 이메일 존재 확인
        const existingUser = await db.collection(process.env.MONGODB_USER as string).findOne({email});
        if (existingUser) {
            return NextResponse.json({
                success: true,
                status: 500,
                message: 'is valid email',
                oid: existingUser._id,
            });
        }
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