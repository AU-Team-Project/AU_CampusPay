import React from "react";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

import TopNavbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import MainPageSection from "@/components/MainPageSection";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <>
            <TopNavbar/>
            <main className='min-h-screen max-h-full text-white'>
                <MainPageSection session={session}/>
            </main>
            <Footer/>
        </>
    )
}