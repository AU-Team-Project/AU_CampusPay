'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";
import {useSession} from "next-auth/react";
import Image from 'next/image'
import NavbarLink from "@/components/ui/NavbarLink";

const TopNavbar = () => {
    const {data: session} = useSession();

    const navbarLink = [
        {
            href: `/ticket/${session?.user?.username}`,
            label: '식권사용'
        },
        {
            href: `/payment/${session?.user?.username}`,
            label: '식권구입'
        },
        {
            href: `/history/${session?.user?.username}`,
            label: '결제내역'
        },
    ];

    const [isClicked, setIsClicked] = useState(false);

    const handleNavClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <header className=''>
            {/** TopNav PC 환경 */}
            <nav className='h-14 flex justify-between items-center bg-blue-custom text-white'>
                <div className='pl-10'>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/logo_Kor.svg'
                            width={125}
                            height={80}
                            alt='웹페이지 로고'
                        />
                    </Link>
                </div>
                <ul className='h-full flex justify-start items-center gap-3 hidden md:flex'>
                    <NavbarLink
                        session={session}
                        navbarLink={navbarLink}
                    />
                </ul>
                <button onClick={handleNavClick} className='pr-10 md:hidden'>
                    <GiHamburgerMenu/>
                </button>
            </nav>

            {/** TopNav Open 모바일 대응 */}
            <div className={`fixed top-0 right-0 w-screen h-full bg-gray-50 transition-transform duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className='h-14 flex justify-between items-center bg-blue-custom text-white'>
                    <li className='pl-10'>
                        <Link className='flex items-center gap-1' href='/'>
                            <Image
                                src='/logo_Kor.svg'
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
                <ul className='pr-10 pl-10 text-lg'>
                    <NavbarLink
                        session={session}
                        navbarLink={navbarLink}
                    />
                </ul>
            </div>
        </header>
    );
};

export default TopNavbar;