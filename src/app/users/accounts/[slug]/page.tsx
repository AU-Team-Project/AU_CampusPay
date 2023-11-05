import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

const MyAccount = async ({slug}: any) => {
    const session: any = await getServerSession(options)
    if (!session || session?.user.role !== 'customer') {
        redirect('/')
    }
    console.log(session)
    console.log(slug)

    return (
        <div>
            MyAccount
        </div>
    );
};

export default MyAccount;