'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from 'next/image'

import {signIn, signOut, useSession} from "next-auth/react";
import Button from "@/components/ui/Button/Button";
import {User} from "@/model/user";

type CustomSession = {
    user: User;
}

const DesktopNavbar = () => {
    const {data: session} = useSession();
    const userRole = session?.user?.role;

    const NavbarRoute = [
        {
            id: 1,
            label: '식단표',
            href: `/menu/student?page=1`,
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
                        <li className='flex items-center text-primary-color'>
                            <Link href='/admin'>
                                관리자 페이지
                            </Link>
                        </li>
                        <li className='flex items-center text-primary-color'>
                            <Button
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
                        <li className='text-primary-color'>
                            <Button
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    </>
                )
            default:
                return !session ? (
                    <>
                        <li className='flex items-center text-black-color font-bold'>
                            <Link href='/register'>회원가입</Link>
                        </li>
                        <li className='py-1 px-4 text-primary-color text-xl border-solid border-primary-color border-4 rounded-3xl hover:bg-primary-color hover:text-white hover:duration-300'>
                            <Button
                                text={'로그인'}
                                onClick={() => signIn()}
                            />
                        </li>
                    </>
                ) : null;
        }
    }

    return (
        <header className='min-w-[320px] flex-col shadow-lg shadow-gray-50 bg-white'>
            <div className={'text-[17px] h-[65px] flex items-center'}>
                {/* Global Navigation Menu (PC) */}
                <nav className='w-full'>
                    <ul className='text-black-color font-semibold flex items-centers justify-center gap-12'>
                        <li className={'flex items-center'}>
                            <Link href='/'>
                                <Image
                                    src='/Logo.svg'
                                    alt='웹페이지 로고'
                                    width={93}
                                    height={13}
                                />
                            </Link>
                        </li>
                        {NavbarRoute.map((item => (
                            <li key={item.id} className={'flex items-center'}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        )))}
                        <>{getLinkItem(session)}</>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default DesktopNavbar;