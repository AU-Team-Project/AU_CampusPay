import React from "react";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession, Session} from "next-auth";

import TopNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainPageSection from "@/components/MainPageSection";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <div>
            <TopNavbar/>
            <main className='w-screen min-h-screen max-h-full bg-gray-200 text-white'>
                <MainPageSection session={session}/>
            </main>
            <Footer/>
        </div>
    )
}