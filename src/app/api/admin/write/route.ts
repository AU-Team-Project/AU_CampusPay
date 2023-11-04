import {connectDB} from "@/app/api/db/mongoDb";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {NextResponse} from "next/server";
import {getMonthAndDay} from "@/service/date";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(options);
        if (!session) {
            return NextResponse.json({
                status: 405,
                error: '로그인이 필요합니다.'
            })
        }

        if (session.user.role !== 'admin') {
            return NextResponse.json({
                status: 403,
                error: '관리자만 접근이 가능합니다.'
            });
        }

        const bodyData = await request.json();
        const { user_id, username, title, content } = bodyData;

        if (!title) {
            return NextResponse.json({
                status: 400,
                error: '제목은 필수입니다.'
            });
        }

        if (content === '') {
            return NextResponse.json({
                status: 400,
                error: '본문을 작성해주세요.'
            });
        }

        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const {month, day} = getMonthAndDay();
        const todayWriteDate = `${month}월 ${day}일`

        const result = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).insertOne({
            username,
            user_id,
            title: title,
            content: content,
            time: todayWriteDate,
        });

        return NextResponse.json({
            success: true,
            status: 200,
            message: '게시물이 등록되었습니다.',
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: `서버 오류: ${err}`
        });
    }
}