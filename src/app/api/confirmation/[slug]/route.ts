import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/app/api/db/mongoDb";

export async function GET(request: NextRequest) {
    const db = (await connectDB).db(process.env.MONGODB_NAME as string);
    const result = await db.collection(process.env.MONGODB_PAYMENT as string).find().toArray();
    return NextResponse.json({ data: result, pretty: true })
};