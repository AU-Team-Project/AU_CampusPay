import React from 'react';
import VerticalNav from "@/components/adminNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

import AdminHistoryItem from "@/components/adminHistoryItem";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user.role || !session) {
        window.location.href = '/';
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    const ticket = [
        {
            label: '하루 판매 티켓 수',
            value: data.totalTicket,
        },
        {
            label: '하루 거래 금액',
            value: data.totalAmount,
        },
        {
            label: '판매 순수익',
            value: data.profit,
        },
    ]

    return (
        <div className="flex">
            <div className="w-[400px]">
                <VerticalNav/>
            </div>

            <main className="w-screen h-screen">
                <section className="mt-[25px] ml-[100px] flex flex-row justify-center gap-[130px]">
                    {ticket.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-[25%] h-[200px] text-center mt-10 bg-blue-100 rounded-[15px]"
                        >
                            <span className="p-[20px] text-[22px] font-bold">
                                {item.label}
                            </span>
                            <span className="mt-10 text-[27px] font-semibold">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </section>
                <section className="ml-[100px]">
                    <AdminHistoryItem/>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;