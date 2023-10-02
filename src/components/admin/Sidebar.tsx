"use client"
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

import DashboardIcon from "@/components/ui/icons/DashboardIcon";
import AdminTicketIcon from "@/components/ui/icons/AdminTicketIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import QrCodeIcon from "@/components/ui/icons/QrCodeIcon";
import NoticeIcon from "@/components/ui/icons/NoticeIcon";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const sideMenu = [
    {
        href: '/admin',
        icon: <DashboardIcon />,
        name: '대시보드'
    },
    {
        href: '/admin/orders',
        icon: <AdminTicketIcon />,
        name: '주문 관리'
    },
    {
        href: '/admin/customers',
        icon: <UserIcon />,
        name: '사용자 관리'
    },
    {
        href: '/notice',
        icon: <NoticeIcon />,
        name: '공지 관리'
    },
    {
        href: '/admin/scanner',
        icon: <QrCodeIcon />,
        name: '스캐너'
    }
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`flex ${isSidebarOpen ? 'md:w-[120px]' : 'w-0'} ease-out duration-200`}>
            <div className="fixed w-full h-[60px] bg-white border-b-[1px] z-40">
                <button
                    onClick={toggleSidebar}
                    className="h-full py-5 px-8 md:block hidden"
                >
                    {isSidebarOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </button>
                <Link
                    href='/'
                    className='absolute p-1 top-1 md:translate-x-[100px] translate-x-[20px] translate-y-[2px] bg-blue-custom rounded-[50%]'
                >
                    <Image
                        src='/AU_White.svg'
                        width={60}
                        height={60}
                        alt='웹페이지 로고'
                    />
                </Link>
            </div>
            <div className={`fixed ${isSidebarOpen ? 'md:w-[200px]' : 'md:w-20'} z-40 md:top-0 bottom-0 md:h-screen h-fit w-screen p-4 mt-[60px] bg-white border-r-[1px] flex md:flex-col flex-row ease-out duration-300`}>
                <div className='w-full flex md:flex-col flex-row md:justify-start justify-evenly mt-3 gap-[25px]'>
                    {sideMenu.map((item, index) => (
                        <div className="flex flex-col text-center items-center gap-1.5" key={index}>
                            <Link
                                href={item.href}
                                className={`flex md:flex-row flex-col items-center w-fit ${isSidebarOpen ? 'w-full md:pr-[20px]' : 'pr-0'} pr-0 rounded-[25px] hover:bg-gray-100 ease-out duration-300`}
                            >
                                <div className='p-4 w-fit h-fit rounded-lg bg-gray-100 hover:bg-gray-200 ease-out duration-300'>
                                    {item.icon}
                                </div>
                                <span className={`w-full ml-2 ${isSidebarOpen ? 'md:flex hidden' : 'md:hidden hidden'} items-center ease-out duration-200 md:block text-[12px] text-gray-400`}>{item.name}</span>
                            </Link>
                            <span className='w-[85px] md:hidden block text-[12px] text-gray-400'>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
