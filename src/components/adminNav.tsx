"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NavItem = {
    href: string;
    label: string;
    subItems?: NavItem[];
};

const verticalNavItem = [
    {
        href: '/admin',
        label: '대시보드',
    },
    {
        href: '/',
        label: '시스템 모니터링',
        subItems: [
            { href: '/admin', label: '서버 상태 모니터링' },
            { href: '/admin', label: '로그 파일 관리' },
        ],
    },
    {
        href: '/',
        label: '컨텐츠 관리',
        subItems: [
            { href: '/admin', label: '게시물 관리' },
            { href: '/admin', label: '카테고리 관리' },
            { href: '/admin', label: '메뉴 관리' },
        ],
    },
    {
        href: '/',
        label: '설정',
        subItems: [
            { href: '/admin', label: '시스템 설정' },
        ],
    },
    {
        href: '/',
        label: '통계',
        subItems: [
            { href: '/admin', label: '사용자 통계' },
            { href: '/admin', label: '판매 통계' },
        ],
    },
    {
        href: '/admin',
        label: '사용자 관리',
    },
    {
        href: '/admin/scanner',
        label: '식권 스캐너',
    },
]

const VerticalNav = () => {
    const [showSubMenu, setShowSubMenu] = useState<boolean[]>(Array(verticalNavItem.length).fill(false));

    const toggleSubMenu = (index:number) => {
        const updatedState = [...showSubMenu];
        updatedState[index] = !updatedState[index];
        setShowSubMenu(updatedState);
    };

    return (
        <nav className="h-full bg-blue-custom overflow-y-auto">
            <div className='p-3'>
                <Link className='flex items-center gap-1' href='/'>
                    <Image
                        src='/AU_White.svg'
                        width={100}
                        height={55}
                        alt='웹페이지 로고'
                    />
                </Link>
            </div>

            <div className="text-[20px] text-white font-semibold flex flex-col bg-blue-custom">
                {verticalNavItem.map((item, index) => (
                    <>
                        <span
                            className={`pl-[20px] p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer
                            ${showSubMenu[index] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                            onClick={() => toggleSubMenu(index)}
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </span>
                        {showSubMenu[index] && item.subItems && (
                            <div className="text-[20px] text-white font-semibold flex flex-col gap-3 bg-blue-custom">
                                {item.subItems.map((subItem, subIndex) => (
                                    <span key={subIndex} className="pl-5 p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer">
                                        <Link href={subItem.href}>
                                            {subItem.label}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        )}
                    </>
                ))}
            </div>
        </nav>
    );
};

export default VerticalNav;