import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from "@/app/api/db/mongoDb";

export async function POST(request: NextRequest) {
    /** ### JSON 요청 본문에서 imp_uid와 merchant_uid를 추출. */
    const { imp_uid, merchant_uid } = await request.json();
    console.log(`imp_uid : ${imp_uid}`)
    console.log(`merchant_uid : ${merchant_uid}`)

    try {
        /** ### IAMPORT API를 호출하여 토큰을 가져옴. */
        const getTokenResponse = await fetch('https://api.iamport.kr/users/getToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imp_key: process.env.IAMPORT_API_KEY, // 환경 변수에서 IAMPORT API 키를 가져옵니다.
                imp_secret: process.env.IAMPORT_API_SECRET // 환경 변수에서 IAMPORT API 비밀번호를 가져옵니다.
            })
        });

        /** ### 토큰 요청이 실패한 경우 에러 발생 */
        const getTokenResult = await getTokenResponse.json();
        if (!getTokenResponse.ok) {
            throw new Error(getTokenResult.message || 'Token retrieval failed');
        }
        /** ### 토큰 요청의 응답에서 access_token을 추출 */
        const { access_token } = getTokenResult.response;
        /** ### access_token을 사용하여 결제 데이터를 가져옴. */
        const getPaymentDataResponse = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
            method: 'GET',
            headers: {
                Authorization: access_token
            }
        });

        /** ### 결제 데이터 요청이 실패한 경우 에러 발생 */
        const paymentDataResult = await getPaymentDataResponse.json();
        if (!getPaymentDataResponse.ok) {
            throw new Error(paymentDataResult.message || 'Payment data retrieval failed');
        }

        /** ### 결제 데이터 요청 응답에서 결제 데이터를 추출 */
        const paymentData = paymentDataResult.response;
        console.log('paymentData : ', paymentData);

        /** ### 결제 데이터 데이터 베이스에 저장 */
        const db = (await connectDB).db(process.env.MONGODB_NAME as string);
        await db.collection(process.env.MONGODB_PAYMENT as string).insertOne({
            amount: paymentData.amount,
            name: paymentData.buyer_name,
            email: paymentData.buyer_email,
            phone: paymentData.buyer_tel,
            menu: paymentData.name,
            imp: paymentData.imp_uid,
            merchant: paymentData.merchant_uid,
            pg: paymentData.pg_provider,
        })

        /** ### 응답 반환 : 결제 데이터 */
        return NextResponse.json({ paymentData });
    } catch (error) {
        /** ### 오류 발생시 콘솔에서 오류 메세지 출력 및 500 코드를 포함한 오류 메세지 반환 */
        if (error instanceof Error) {
            console.error('Error processing payment: ', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}