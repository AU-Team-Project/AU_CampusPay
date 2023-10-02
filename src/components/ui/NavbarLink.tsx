'use client'
import React from 'react';
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";
import {User} from "@/model/user";

import ColorButton from "@/components/ui/ColorButton";

type CustomSession = {
    user: User;
}

const NavbarLink = ({ session, navbarLink }: { session: CustomSession | null, navbarLink: { href: string, label: string }[] }) => {
    return (
        <>
            {session?.user?.role === 'admin' && <li>
                <Link href='/admin'>관리자 페이지</Link>
            </li>}
            {!session ? (
                <>
                    <li>
                        <Link href='/register'>회원가입</Link>
                    </li>
                    <li className='xl: pr-10'>
                        <ColorButton
                            text={'로그인'}
                            onClick={() => signIn()}
                        />
                    </li>
                </>
            ) : (
                <>
                    {navbarLink.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className='xl: pr-10'>
                        <ColorButton
                            text={'로그아웃'}
                            onClick={() => signOut()}
                        />
                    </li>
                </>
            )}
        </>
    );
};

export default NavbarLink;