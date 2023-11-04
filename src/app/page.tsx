import React from "react";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

import TabMenu from "@/components/TabMenu";
import TopNavbar from "@/components/Navbar";
import QuickMenu from "@/components/QuickMenu";
import Announcement from "@/components/Announcement";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <>
            <TopNavbar/>
            <main className='min-h-screen max-h-full bg-gray-200'>
                <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
                    <TabMenu session={session}/>
                    <QuickMenu session={session}/>
                    <Announcement/>
                </div>
            </main>
        </>
    )
}