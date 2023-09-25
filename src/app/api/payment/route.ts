import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from "@/app/api/db/mongoDb";
import {getMonthAndDay} from "@/service/date";

export async function POST(request: NextRequest) {
    /** JSON 요청 본문에서 "imp_uid"와 "merchant_uid"를 추출. */
    const { imp_uid, merchant_uid } = await request.json();
    console.log(`imp_uid : ${imp_uid}`)
    console.log(`merchant_uid : ${merchant_uid}`)

    try {
        /** IAMPORT API를 호출하여 토큰을 가져옴. */
        const getTokenResponse = await fetch('https://api.iamport.kr/users/getToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imp_key: process.env.IAMPORT_API_KEY,
                imp_secret: process.env.IAMPORT_API_SECRET
            })
        });

        /** 토큰 요청이 실패한 경우 에러 발생 */
        const getTokenResult = await getTokenResponse.json();
        if (!getTokenResponse.ok) {
            throw new Error(getTokenResult.message || 'Token retrieval failed');
        }
        /** 토큰 요청의 응답에서 access_token을 추출 */
        const { access_token } = getTokenResult.response;
        /** access_token을 사용하여 결제 데이터를 가져옴. */
        const getPaymentDataResponse = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
            method: 'GET',
            headers: {
                Authorization: access_token
            }
        });

        /** 결제 데이터 요청이 실패한 경우 에러 발생 */
        const paymentDataResult = await getPaymentDataResponse.json();
        if (!getPaymentDataResponse.ok) {
            throw new Error(paymentDataResult.message || 'Payment data retrieval failed');
        }

        /** 결제 데이터 요청 응답에서 결제 데이터를 추출 */
        const paymentData = paymentDataResult.response;
        console.log('paymentData : ', paymentData);

        /** 결제 시간 계산 */
        const {month, day} = getMonthAndDay();
        const todayDate = `${month}월 ${day}일`;
        /**
         * 결제 데이터 데이터 베이스에 저장
         * amount: 결제 금액
         * name: 유저 이름
         * email: 유저 이메일
         * phone: 유저 연락처
         * menu: 물품 이름
         * imp:
         * merchant:
         * pg: PG사
         * state: 사용여부
         * todayDate: 결제 시간
         */
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);
        const result = await db.collection(process.env.MONGODB_PAYMENT as string).insertOne({
            amount: paymentData.amount,
            name: paymentData.buyer_name,
            email: paymentData.buyer_email,
            phone: paymentData.buyer_tel,
            menu: paymentData.name,
            imp: paymentData.imp_uid,
            merchant: paymentData.merchant_uid,
            pg: paymentData.pg_provider,
            state: '미사용',
            time: todayDate,
        })

        /** QRCode 생성용 데이터 생성 */
        const qrData = result.insertedId.toString();

        /** 응답 반환 : 결제 데이터 */
        return NextResponse.json({ paymentData, qrData });
    } catch (error) {
        /** 오류 발생시 콘솔에서 오류 메세지 출력 및 500 코드를 포함한 오류 메세지 반환 */
        if (error instanceof Error) {
            console.error('Error processing payment: ', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}