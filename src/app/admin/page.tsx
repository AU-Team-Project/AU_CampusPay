import React from 'react';
import VerticalNav from "@/components/adminNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

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
            {/* 커밋용 주석 */}
            <main className="w-screen grid-cols-3 grid-rows-2">
                <div className="w-1/3">
                    하루 판매 티켓 수 : {data.totalTicket}
                </div>
                <div className="w-1/3">
                    하루 거래 금액 : {data.totalAmount}
                </div>
                <div className="w-1/3">
                    판매 순수익 : {data.profit}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;