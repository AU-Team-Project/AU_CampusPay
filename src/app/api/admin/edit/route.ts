import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    const db = (await connectDB).db(process.env.MONGODB_NAME as string);

    if (!request.body) {
        return NextResponse.json({
            success: false,
            status: 400,
            message: '요청 본문이 비어있습니다.'
        });
    }

    // JSON 파싱
    const body = await request.json();

    // 게시글 수정을 위한 데이터
    const putEditPost = {
        title: body.title,
        content: body.content
    };

    // 수정 작업 수행
    const result = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).updateOne(
        { _id: new ObjectId(body._id) },
        { $set: putEditPost }
    );

    // 수정 작업 결과에 따라 응답 반환
    if (result.modifiedCount && result.modifiedCount > 0) {
        return NextResponse.json({
            success: true,
            status: 200,
            message: '공지 사항이 성공적으로 업데이트되었습니다.'
        });
    } else {
        return NextResponse.json({
            success: false,
            status: 500,
            message: '공지사항을 찾을 수 없거나 업데이트할 수 없습니다.'
        });
    }
};