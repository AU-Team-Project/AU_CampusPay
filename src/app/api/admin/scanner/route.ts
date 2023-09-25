import {NextResponse} from "next/server";
import {connectDB} from "@/app/api/db/mongoDb";
import {ObjectId} from "mongodb";


export async function PUT(request: Request) {
    try {
        const db = (await connectDB).db(process.env.MONGODB_NAME);
        if (!request.body) {
            return NextResponse.json({
                success: false,
                message: '요청 본문이 비어있습니다.',
            })
        }

        const body = await request.json();
        const { _id } = body;

        // 식권 정보 조회
        const ticket = await db.collection(process.env.MONGODB_PAYMENT as string).findOne({
            _id: new ObjectId(_id)
        });

        // 이미 사용된 식권인 경우
        if (ticket && ticket.state === "사용") {
            return NextResponse.json({
                success: false,
                status: 400,
                message: '이미 사용된 식권입니다.'
            });
        }

        // 미사용 식권을 사용으로 변경
        const result = await db.collection(process.env.MONGODB_PAYMENT as string).updateOne(
            {
                _id: new ObjectId(_id),
                state: "미사용"
            },
            { $set: { state: "사용" } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: '이미 사용된 식권이거나 해당 식권을 찾을 수 없습니다.'
            });
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: '성공적으로 스캔되었습니다. 식사 맛있게 하세요!'
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: `${err} 알수 없는 오류가 발생했습니다. 다시 스캔해주세요.`
        })
    }
}