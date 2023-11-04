import {NextResponse} from 'next/server';
import {connectDB} from "@/app/api/db/mongoDb";

export async function GET() {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);
        const users = await db.collection(process.env.MONGODB_USER as string).find().toArray();

        return NextResponse.json({
            success: true,
            status: 200,
            users
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: "에러"
        });
    }
}