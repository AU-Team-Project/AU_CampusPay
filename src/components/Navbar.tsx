'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from 'next/image'

import NavbarLink from "@/components/ui/NavbarLink";
import {useSession} from "next-auth/react";
import {AiOutlineClose} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {
    const {data: session} = useSession();

    const NavbarRoute = [
        {
            id: 1,
            label: '식단표',
            href: `/payment/${session?.user?.username}`,
        },
        {
            id: 2,
            label: '이용방법',
            href: `/`,
        },
        {
            id: 3,
            label: '공지사항',
            href: `/notice/lists?page=1`,
        },
        {
            id: 4,
            label: '문의하기',
            href: `/`,
        },
        {
            id: 5,
            label: '식권구입',
            href: `/payment/${session?.user?.username}`,
        }
    ];

    const [isClicked, setIsClicked] = useState(false);

    const handleNavClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <header className='mt-5 h-[145px] flex-col'>
            {/* PC */}
            <div className='h-14 flex justify-between items-center bg-white text-white'>
                <div className={(!session ? 'ml-[220px]' : 'ml-[245px]') + " flex flex-grow justify-center"}>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/AUCampusPay_Yellow.svg'
                            alt='웹페이지 로고'
                            width={190}
                            height={80}
                        />
                    </Link>
                </div>
                <ul className='font-bold h-full justify-start items-center gap-3 hidden md:flex'>
                    <NavbarLink session={session}/>
                </ul>
                <button onClick={handleNavClick} className='pr-10 md:hidden'>
                    <GiHamburgerMenu/>
                </button>
            </div>
            {/* Global Navigation Menu */}
            <nav className='pt-7'>
                <ul className='flex justify-center gap-20'>
                    {NavbarRoute.map((item => (
                        <li key={item.id}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    )))}
                </ul>
            </nav>
            {/* Mobile */}
            <div className={`fixed top-0 right-0 w-screen h-full bg-gray-50 transition-transform duration-300 z-50 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className='h-14 flex justify-between items-center bg-blue-custom text-white'>
                    <li className='pl-10'>
                        <Link className='flex items-center gap-1' href='/'>
                            <Image
                                src='/CampusPay_Nav.svg'
                                width={125}
                                height={80}
                                alt='웹페이지 로고'
                            />
                        </Link>
                    </li>
                    <li className='pr-10'>
                        <button onClick={handleNavClick}>
                            <AiOutlineClose/>
                        </button>
                    </li>
                </ul>
                <ul className='pt-5 pr-10 pl-10 text-lg space-y-4'>
                    <NavbarLink session={session}/>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;