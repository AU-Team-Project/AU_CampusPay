import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/api/db/mongoDb";

export async function POST(req: NextRequest) {
    const res = await req.json();
    const db = (await connectDB).db('DBTest');

    // QR 코드 값을 통해 데이터베이스에서 해당 레코드를 찾습니다.
    const existingData = await db.collection('test')
        .findOne({ "data.qrData": res.qrData });

    console.log('existingData : ', existingData);
    console.log(res);

    // 해당 레코드가 없거나 이미 사용된 경우 에러 메시지를 반환합니다.
    if (!existingData || existingData.used === 'true') { // 문자열 'true'로 비교
        return NextResponse.json({
            message: 'Invalid or already used QR code'
        });
    }

    // 레코드가 유효하면 "used" 상태를 true로 설정하여 사용된 것으로 표시합니다.
    await db.collection('test').updateOne({
        _id: existingData._id
    }, {
        $set: {
            used: 'true'  // 문자열 'true'로 설정
        }
    });

    return NextResponse.json({
        status: 200,
        message: 'QR code validated and marked as used'
    });
}
