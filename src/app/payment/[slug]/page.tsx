import React from 'react';
import PaymentContainer from "@/app/payment/PaymentContainer";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

const PaymentsPage = async () => {
    const session = await getServerSession(options);
    const user = session?.user;

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <PaymentContainer/>
            </div>
        </div>
    );
};

export default PaymentsPage;