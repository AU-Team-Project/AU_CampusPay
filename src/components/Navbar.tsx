'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";
import {signIn, signOut, useSession} from "next-auth/react";
import ColorButton from "@/components/ui/ColorButton";
import Image from 'next/image'

const TopNavbar = () => {
    const {data: session} = useSession();
    const [isClicked, setIsClicked] = useState(false);
    const handleNavClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <header className=''>
            {/** ### 네비게이션 메뉴 */}
            {/** TODO : 관리자 페이지 session...role === admin */}
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
                <ul className='h-full flex justify-start items-center gap-3 max-xmd:hidden'>
                    {session?.user?.role === 'admin' &&
                        <li><Link href='/admin'>관리자 페이지</Link></li>
                    }
                    {!session ? (
                        <>
                            <li>
                                <Link href='/register'>회원가입</Link>
                            </li>
                            <li className='xl: pr-10'>
                                <ColorButton text={'로그인'} onClick={() => signIn()}/>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href={`/confirmation/${session?.user.name}`}>식권사용</Link>
                            </li>
                            <li>
                                <Link href={`/payment/${session?.user.name}`}>식권구입</Link>
                            </li>
                            <li>
                                <Link href={`/history/${session?.user.name}`}>결제내역</Link>
                            </li>
                            <li className='xl: pr-10'>
                                <ColorButton text={'로그아웃'} onClick={() => signOut()}/>
                            </li>
                        </>
                    )}
                </ul>
                {/** ### 모바일 대응 */}
                <button onClick={handleNavClick} className='pr-10 xmd:hidden max-xmd:block xl:hidden '>
                    <GiHamburgerMenu/>
                </button>
            </nav>
            {/** ### TopNav Open 모바일 대응 (임시) */}
            <div
                className={`fixed top-0 right-0 w-screen h-full bg-gray-50 transition-transform duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
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
                        <button onClick={handleNavClick}><AiOutlineClose/></button>
                    </li>
                </ul>
                <ul className='pr-10 pl-10 text-lg'>
                    <li className='pb-1.5'>
                        <Link href={`/confirmation/${session?.user.name}`}>식권사용</Link>
                    </li>
                    <li className='pb-1.5'>
                        <Link href={`/payment/${session?.user.name}`}>식권구입</Link>
                    </li>
                    <li className='pb-1.5'>
                        <Link href={`/history/${session?.user.name}`}>결제내역</Link>
                    </li>
                    {session?.user?.name === 'root' && (
                        <li className='pb-1.5'>
                            <Link href='/admin'>관리자페이지</Link>
                        </li>
                    )}
                    {/** TODO: Feature 정해진 후 배열에 담아 map 반복 */}
                    {!session ? (
                        <li>
                            <ColorButton text={'로그인'} onClick={() => signIn()}/>
                        </li>
                    ) : (
                        <li className='xl: pr-10'>
                            <ColorButton text={'로그아웃'} onClick={() => signOut()}/>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default TopNavbar;