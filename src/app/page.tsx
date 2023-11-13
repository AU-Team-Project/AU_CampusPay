import React from "react";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import IndexSection from "@/components/IndexSection";
import DesktopNavbar from "@/components/nav/DesktopNavbar";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <Navbar>
            <DesktopNavbar/>
            <main
                className='
                    min-h-screen
                    max-h-full
                    text-white
                '
            >
                <IndexSection session={session}/>
            </main>
            <Footer/>
        </Navbar>
    )
}