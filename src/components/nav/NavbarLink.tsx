'use client'
import React from 'react';
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";
import {User} from "@/model/user";

import ColorButton from "@/components/ui/Button/ColorButton";

type CustomSession = {
    user: User;
}

const NavbarLink = ({session}: { session: CustomSession | null }) => {
    const userRole = session?.user?.role;
    const getLinkItem = () => {
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

    return <>{getLinkItem()}</>
};

export default NavbarLink;