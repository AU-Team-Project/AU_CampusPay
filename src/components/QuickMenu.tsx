'use client'
import React from 'react';
import Link from "next/link";
import {User} from "@/model/user";
import RiceMenuIcon from "@/components/ui/icons/RiceMenuIcon";
import QrCodeIcon from "@/components/ui/icons/QrCodeIcon";
import GetTicketIcon from "@/components/ui/icons/GetTicketIcon";
import PaymentHistoryIcon from "@/components/ui/icons/PaymentHistoryIcon";
import AdminPageIcon from "@/components/ui/icons/AdminPageIcon";
import {signIn} from "next-auth/react";
import {ObjectId} from "mongodb";

type Props = {
    session: {
        user: User;
    }
}

const QuickMenu = ({session}: Props) => {
    const isLoggedOut = !session;
    const links = [
        {
            href: `/confirmation/${session?.user?.username}`,
            icon: <RiceMenuIcon />,
            label: "식단표"
        },
        {
            href: `/ticket/user?name=${session?.user?._id}`,
            icon: <QrCodeIcon />,
            label: "식권 사용"
        },
        {
            href: `/payment/${session?.user?.username}`,
            icon: <GetTicketIcon />,
            label: "식권 구입"
        },
        {
            href: `/history/user?name=${session?.user?._id}`,
            icon: <PaymentHistoryIcon />,
            label: "결제 내역"
        }
    ];

    if (session?.user?.role === 'admin') {
        links.push({
            href: '/admin',
            icon: <AdminPageIcon />,
            label: "관리자 페이지"
        });
    }

    return (
        <div className={`${getQuickMenuStyle(isLoggedOut)} rounded-lg shadow-lg`}>
            {/* 로그인 상태에 따른 유저 정보 표시 혹은 로그인/회원가입 버튼 표시 */}
            {links.map((link, index) => (
                <Link key={index} href={link.href} className={`w-full ${getLoginStateQuickMenuStyle()}`}>
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
            ))}

            {/** 로그인하지 않은 상태에서의 로그인 레이어 표시 */}
            {isLoggedOut && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <button
                        onClick={() => signIn()}
                        className={`bg-white font-bold ${getLoginStateQuickMenuStyle()}`}
                    >
                        로그인 후 이용 가능합니다.
                    </button>
                </div>
            )}
        </div>
    );
};

function getQuickMenuStyle(isLoggedOut: boolean): string {
    const baseStyle = 'mt-0 mx-5 md:mt-5 md:ml-0 p-5 bg-white flex flex-col items-center justify-center gap-4';
    const isLoggedOutStyle = `${isLoggedOut ? 'bg-opacity-50 relative' : ''}`
    return `${baseStyle} ${isLoggedOutStyle}`
}

function getLoginStateQuickMenuStyle(): string {
    return `flex items-center gap-1 p-3 rounded-md border border-gray-300 hover:bg-gray-100`
}

export default QuickMenu;