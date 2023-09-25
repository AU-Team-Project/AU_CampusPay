"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VerticalNav = () => {
    const [showSubMenu, setShowSubMenu] = useState(Array(5).fill(false));

    const toggleSubMenu = (index:number) => {
        const updatedState = [...showSubMenu];
        updatedState[index] = !updatedState[index];
        setShowSubMenu(updatedState);
    };

    return (
        <nav className="h-screen bg-blue-custom overflow-y-auto">
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
                <span
                    className={`p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer ${showSubMenu[0] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                    onClick={() => toggleSubMenu(0)}
                >
                  <Link href="/admin">대시보드</Link>
                </span>
                <span
                    className={`p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer ${showSubMenu[1] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                    onClick={() => toggleSubMenu(1)}
                >
                  시스템 모니터링
                </span>
                {showSubMenu[1] && (
                    <div className="text-[20px] text-white font-semibold flex flex-col gap-3 bg-blue-custom">
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">서버 상태 모니터링</Link>
                        </span>
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">로그 파일 관리</Link>
                        </span>
                    </div>
                )}

                <span
                    className={`p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer ${showSubMenu[2] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                    onClick={() => toggleSubMenu(2)}
                >
                  컨텐츠 관리
                </span>
                {showSubMenu[2] && (
                    <div className="text-[20px] text-white font-semibold flex flex-col gap-3 bg-blue-custom">
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">게시물 관리</Link>
                        </span>
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">카테고리 관리</Link>
                        </span>
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">메뉴 관리</Link>
                        </span>
                    </div>
                )}

                <span
                    className={`p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer ${showSubMenu[3] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                    onClick={() => toggleSubMenu(3)}
                >
                  설정
                </span>
                {showSubMenu[3] && (
                    <div className="text-[20px] text-white font-semibold flex flex-col gap-3 bg-blue-custom">
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">시스템 설정</Link>
                        </span>
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">보안 설정</Link>
                        </span>
                    </div>
                )}

                <span
                    className={`p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer ${showSubMenu[4] ? 'bg-gradient-to-r from-sky-500 to-blue-500' : ''}`}
                    onClick={() => toggleSubMenu(4)}
                >
                  통계
                </span>
                {showSubMenu[4] && (
                    <div className="text-[20px] text-white font-semibold flex flex-col gap-3 bg-blue-custom">
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">사용자 통계</Link>
                        </span>
                        <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer pl-5">
                          <Link href="/admin">판매 통계</Link>
                        </span>
                    </div>
                )}

                <span className="p-3 hover:bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer">
                  <Link href="/admin">사용자 관리</Link>
                </span>
            </div>
        </nav>
    );
};

export default VerticalNav;