import React from 'react';
import PaymentContainer from "@/app/payment/PaymentContainer";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Navbar from "@/components/nav/Navbar";

const PaymentsPage = async () => {
    const session = await getServerSession(options);
    const user = session?.user;

    if (!user) {
        redirect('/login')
    }

    return (
        <Navbar>
            <div className="min-h-screen bg-[#f7f7f7]">
                <div className="w-full h-[125px] bg-[#F58D8D]"></div>
                {/* 이미지 넣을거임. */}
                <div className="relative bottom-[35px]">
                    <PaymentContainer/>
                </div>
            </div>
        </Navbar>
    );
};

export default PaymentsPage;