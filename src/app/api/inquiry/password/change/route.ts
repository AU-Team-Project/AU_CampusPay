import { connectDB } from "@/app/api/db/mongoDb";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const db = (await connectDB).db(process.env.MONGODB_NAME as string);

    // Content-Type 헤더 확인
    if (request.headers.get('content-type') !== 'application/json') {
        return new Response('Content-Type must be application/json', { status: 400 });
    }

    // JSON 파싱
    const body = await request.json();

    // 비밀번호 해싱
    const pwdHash: string = await bcrypt.hash(body.password, 12);

    // 비밀번호 업데이트 데이터
    const putChangePwd = {
        password: pwdHash
    };

    // 업데이트 작업 수행
    const result = await db.collection(process.env.MONGODB_USER as string).updateOne(
        { _id: new ObjectId(body._id)},
        { $set: putChangePwd }
    );

    // 결과에 따른 응답 반환
    if (result.modifiedCount && result.modifiedCount > 0) {
        return NextResponse.json({
            success: true,
            status: 200,
            message: '비밀번호가 성공적으로 업데이트되었습니다.'
        });
    } else {
        return NextResponse.json({
            success: false,
            status: 500,
            message: '비밀번호를 찾을 수 없거나 업데이트할 수 없습니다.'
        });
    }
}
