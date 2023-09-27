import React from 'react';
import VerticalNav from "@/components/VerticalNav";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

import AdminHistoryItem from "@/components/adminHistoryItem";
import AdminCard from "@/components/ui/card/AdminCard";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user.role || !session) {
        window.location.href = '/';
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    return (
        <div className='relative'>
            <VerticalNav/>

            <main
                className="w-screen h-screen absolute left-[300px]"
                style={{ width: 'calc(100% - 300px)' }}
            >
                <AdminCard data={data}/>
                <AdminHistoryItem/>
            </main>
        </div>
    );
};

export default AdminPage;