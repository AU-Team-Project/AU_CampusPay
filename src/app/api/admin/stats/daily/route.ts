import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const sales = await db.collection(process.env.MONGODB_PAYMENT as string).find().toArray()
        const salesCopy = [...sales];

        // 판매 티켓 수 계산
        const totalTicketsSold = salesCopy.length;

        // 판매 총 금액 계산
        const totalAmount = salesCopy.splice(1).reduce((acc, ticket) => {
            return acc + ticket.amount;
        }, 0);

        // 판매 순수익 계산
        const netProfit = totalAmount;

        return NextResponse.json({
            success: true,
            message: '가져오기 성공',
            pretty: true,
            status: 200,
            data: sales,
            totalAmount: totalAmount,
            profit: netProfit,
            totalTicket: totalTicketsSold,
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