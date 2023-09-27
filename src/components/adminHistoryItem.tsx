import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const AdminHistoryItem = async () => {
    const session = await getServerSession(options);
    if(!session?.user.role || !session) {
        window.location.href='/';
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();
    console.log(data.data)
    console.log(data.totalAmount)
    console.log(data.totalTicket)
    console.log(data.profit)

    return (
        <div className="mx-[20px] mt-[50px] ">
            <span className="ml-[20px] text-[27px] font-semibold">최근 구매 내역</span>
            <div className="mb-[50px] h-fit bg-gray-50 border-2 border-gray-300 rounded-[15px]">
                <div className='flex justify-between py-[20px] font-semibold bg-gray-200 rounded-t-[13px]'>
                    <div className='w-1/4 px-2 text-center'>이름</div>
                    <div className='w-1/4 px-2 text-center'>결제 가격</div>
                    <div className='w-1/4 px-2 text-center'>구매 상품</div>
                </div>
                {data.data.slice(0, 8).map((payment: any, index: number) => (
                    <div key={index} className={`flex justify-between py-[1%] ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <div className='w-1/4 px-2 text-center text-[16px]'>{payment.name}</div>
                        <div className='w-1/4 px-2 text-center'>{payment.amount}원</div>
                        <div className='w-1/4 px-2 text-center'>{payment.menu}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHistoryItem;