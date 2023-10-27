import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";
import {formatDate} from "@/service/date";

export async function GET() {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const sales = await db.collection(process.env.MONGODB_COOK as string)
            .find()
            .toArray()

        const formattedSales = sales.map(sale => ({
            ...sale,
            date: formatDate(sale.date),
        }));

        return NextResponse.json({
            success: true,
            status: 200,
            message: '가져오기 성공',
            data: formattedSales,
        })
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({
                success: false,
                status: 500,
                message: '인터넷 또는 서버 오류 발생',
                err: err.message
            });
        }
    }
}