import {connectDB} from "@/app/api/db/mongoDb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const dbConnection = await connectDB
        const db = dbConnection.db(process.env.MONGODB_NAME);
        const announcementsCollection = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string)
            // .find()
            // .limit(10)
            // .toArray();

        const totalPages = await announcementsCollection.count();
        console.log(totalPages)

        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const pageSize = 10;
        const findCollection = await announcementsCollection
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        return NextResponse.json({
            success: true,
            status: 200,
            message: '수정할 게시물을 성공적으로 가져왔습니다.',
            data: findCollection,
            totalPages,
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            massage: `오류가 발생했습니다. ${err}`
        });
    }
}