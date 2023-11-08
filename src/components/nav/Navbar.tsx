'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from 'next/image'

import NavbarLink from "@/components/nav/NavbarLink";
import {signIn, signOut, useSession} from "next-auth/react";
import {AiOutlineClose} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import ColorButton from "@/components/ui/Button/ColorButton";
import {User} from "@/model/user";

type CustomSession = {
    user: User;
}

const Navbar = () => {
    const {data: session} = useSession();
    const userRole = session?.user?.role;

    const NavbarRoute = [
        {
            id: 1,
            label: '식단표',
            href: `/payment/${session?.user?.username}`,
        },
        {
            id: 2,
            label: '이용방법',
            href: `/guide`,
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

    const getLinkItem = (session: CustomSession | null) => {
        switch (userRole) {
            case 'admin':
                return (
                    <>
                        <li className='text-primary-color'>
                            <Link href='/admin'>
                                관리자 페이지
                            </Link>
                        </li>
                        <li className='text-primary-color xl:pr-10'>
                            <ColorButton
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    </>
                )
            case 'customer':
                return (
                    <>
                        <li className='text-primary-color'>
                            <Link href={`/users/accounts/${session?.user?.student_number}`}>
                                마이 페이지
                            </Link>
                        </li>
                        <li className='text-primary-color xl:pr-10'>
                            <ColorButton
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    </>
                )
            default:
                return !session ? (
                    <>
                        <li className='text-primary-color'>
                            <Link href='/register'>회원가입</Link>
                        </li>
                        <li className='text-primary-color xl: pr-10'>
                            <ColorButton
                                text={'로그인'}
                                onClick={() => signIn()}
                            />
                        </li>
                    </>
                ) : null;
        }
    }


    return (
        <header className='pt-5 w-screen flex-col shadow-lg shadow-gray-50 bg-white z-10'>
            {/* Global Navigation Menu (PC) */}
            <nav className='h-24 flex justify-between items-center'>
                <div className={'pl-10'}>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/Logo.svg'
                            alt='웹페이지 로고'
                            width={190}
                            height={80}
                        />
                    </Link>
                </div>
                <ul className='text-[20px] font-semibold flex justify-center gap-12'>
                    {NavbarRoute.map((item => (
                        <li key={item.id}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    )))}
                </ul>
                <ul className={'flex gap-5'}>
                    {getLinkItem(session)}
                </ul>
                <button onClick={handleNavClick} className='pr-10 md:hidden'>
                    <GiHamburgerMenu/>
                </button>
            </nav>
            {/* Global Navigation Menu (Mobile) */}
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