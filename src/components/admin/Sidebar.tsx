import React from 'react';
import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@/components/ui/icons/DashboardIcon";
import AdminTicketIcon from "@/components/ui/icons/AdminTicketIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import QrCodeIcon from "@/components/ui/icons/QrCodeIcon";

const sideMenu = [
    {
        href: '/admin',
        icon: <DashboardIcon/>
    },
    {
        href: '/admin',
        icon: <AdminTicketIcon/>
    },
    {
        href: '/admin',
        icon: <UserIcon/>
    },
    {
        href: '/admin/scanner',
        icon: <QrCodeIcon/>
    }
]

const Sidebar = () => {
    return (
        <div className='flex'>
            <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <Link href='/'>
                        <Image
                            className='p-1 bg-blue-custom rounded-[50%]'
                            src='/AU_White.svg'
                            width={50}
                            height={50}
                            alt='웹페이지 로고'
                        />
                    </Link>
                    {sideMenu.map((item, index) => (
                        <>
                            <Link
                                key={index}
                                href={item.href}
                            >
                                <div className='my-4 p-3 inline-block rounded-lg bg-gray-100 hover:bg-gray-200'>
                                    {item.icon}
                                </div>
                            </Link>
                            <span className='w-full p-2 border-b-[1px] border-gray-50'></span>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;