import {connectDB} from "@/app/api/db/mongoDb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const dbConnection = await connectDB
        const db = dbConnection.db(process.env.MONGODB_NAME);
        const cookCollection = await db.collection(process.env.MONGODB_COOK as string)

        const totalPages = await cookCollection.count();
        console.log(totalPages)

        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const pageSize = 10;
        const findCollection = await cookCollection
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        return NextResponse.json({
            success: true,
            status: 200,
            message: '가져오기 성공.',
            data: findCollection,
            totalPages,
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            massage: `인터넷 또는 서버 오류 발생 ${err}`
        });
    }
}