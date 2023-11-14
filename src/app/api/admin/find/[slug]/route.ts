import {connectDB} from "@/app/api/db/mongoDb";
import {NextRequest, NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postValue = searchParams.get('post');

        if (!postValue) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: '쿼리 매개변수가 누락되었습니다.'
            });
        }

        if (!ObjectId.isValid(postValue)) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: '잘못된 ObjectId 형식입니다.'
            });
        }

        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const findCollection = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).findOne({
            _id: new ObjectId(postValue)
        });

        if (!findCollection) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: '게시물을 가져오지 못했습니다.'
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: '수정할 게시물을 성공적으로 가져왔습니다.',
            data: findCollection,
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            massage: `오류가 발생했습니다. ${err}`
        });
    }
}