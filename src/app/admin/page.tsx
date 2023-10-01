import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import AdminTopCard from "@/components/ui/card/AdminTopCard";
import Sidebar from "@/components/admin/Sidebar";
import BarChart from "@/components/ui/chart/BarChart";
import RecentOrders from "@/components/admin/RecentOrders";

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
                <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <BarChart/>
                    <RecentOrders/>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;