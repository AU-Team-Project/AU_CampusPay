import React from 'react';
import VerticalNav from "@/components/adminNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if(!session?.user.role || !session) {
        window.location.href='/';
    }
    console.log(session)

    return (
        <div className="flex">
            <div className="w-[400px]">
                <VerticalNav />
            </div>

            <main className="w-screen grid-cols-3 grid-rows-2">
                <div className="w-1/3">
                    하루 판매 수dddd
                </div>
                <div className="w-1/3">
                    하루 거래 액
                </div>
                <div className="w-1/3">
                    하루 취소 액
                </div>
            </main>
        </div>
    );
};

export default AdminPage;