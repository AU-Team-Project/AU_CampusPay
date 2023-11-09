import React from 'react';
import Footer from "@/components/Footer";
import TopNavbar from "@/components/nav/Navbar";
import MainPageSection from "@/components/MainPageSection";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const TestPage = async () => {
    const session: any = await getServerSession(options)

    return (
        <div>
            <TopNavbar/>
            <main className='w-screen min-h-screen max-h-full text-white'>
                <MainPageSection session={session}/>
            </main>
            <Footer/>
        </div>
    );
};

export default TestPage;