import React from 'react';
import VerticalNav from "@/components/adminNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

import AdminHistoryItem from "@/components/adminHistoryItem";

const AdminPage = async () => {
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
        <div className="flex">
            <div className="w-[400px]">
                <VerticalNav />
            </div>

            <main className="w-screen h-screen">
                <section className="mt-[25px] ml-[100px] flex flex-row justify-center gap-[130px]">
                    <div className="flex flex-col w-[25%] h-[200px] text-center mt-10 bg-blue-100 rounded-[15px]">
                    <span className="p-[20px] text-[22px] font-bold">
                        하루 판매 티켓 수
                    </span>
                        <span className="mt-10 text-[27px] font-semibold">{data.totalTicket}매</span>
                    </div>
                    <div className="flex flex-col w-[25%] h-[200px] text-center mt-10 bg-purple-100 rounded-[15px]">
                    <span className="p-[20px] text-[22px] font-bold">
                    하루 거래 금액
                    </span>
                        <span className="mt-10 text-[27px] font-semibold">{data.totalAmount}원</span>
                    </div>
                    <div className="flex flex-col w-[25%] h-[200px] text-center mt-10 bg-yellow-100 rounded-[15px]">
                    <span className="p-[20px] text-[22px] font-bold">
                    판매 순수익
                    </span>
                        <span className="mt-10 text-[27px] font-semibold">{data.profit}원</span>
                    </div>
                </section>
                <section className="ml-[100px]">
                    <AdminHistoryItem/>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;