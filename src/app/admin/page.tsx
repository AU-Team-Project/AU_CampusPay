import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import AdminTopCard from "@/components/ui/card/AdminTopCard";
import Sidebar from "@/components/Sidebar";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user.role || !session) {
        window.location.href = '/';
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    return (
        <div className='flex'>
            <Sidebar/>
            <main className="w-full ml-20 bg-gray-50">
                <AdminTopCard data={data}/>
                {/*<AdminHistoryItem/>*/}
            </main>
        </div>
    );
};

export default AdminPage;