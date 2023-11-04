import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/app/api/db/mongoDb";
import {ObjectId} from "mongodb";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('name')

    const query = {
        userid: userid
    }

    if (!userid) {
        return NextResponse.json({
            status: 400,
            message: 'User ID is required.'
        })
    }

    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);
        const result = await db.collection(process.env.MONGODB_PAYMENT as string)
            .find(query)
            .toArray();

        return NextResponse.json({
            data: result,
            status: 200,
            pretty: true
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error'
        })
    }
}