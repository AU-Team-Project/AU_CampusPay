import {connectDB} from "@/app/api/db/mongoDb";
import {ObjectId} from "mongodb";
import {NextResponse} from "next/server";

export async function DELETE(request: Request) {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const body = await request.json();

        const result = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).deleteOne({
            _id: new ObjectId(body._id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: '게시글을 찾을 수 없습니다.'
            });
        }

        return NextResponse.json({
            success: true,
            statue: 200,
            message: '게시글이 삭제되었습니다.'
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: `${err}, 오류로 인해 게시글이 삭제되지 않았습니다.`
        })
    }
}