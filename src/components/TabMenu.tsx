'use client'
import { User } from '@/model/user';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MenuCard from "@/components/ui/MenuCard";

type Props = {
    session: {
        user: User;
    }
}

const tabList = [
    {label: '교직원'},
    {label: '학생'},
    {label: '기숙사'},
]

const TabMenu = ({session}: Props) => {
    const [activeTab, setActiveTab] = useState('교직원');

    const tabIndex = tabList.findIndex(tab => tab.label === activeTab);

    return (
        <div className="m-5 mb-0 col-span-1 bg-white rounded-lg shadow-lg md:col-span-2 md:mr-0 relative">
            <div className="flex border-b mb-4 relative">
                {tabList.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`py-2 px-4 w-full text-center ${activeTab === item.label ? "font-semibold" : ""}`}
                    >
                        {item.label}
                    </button>
                ))}
                <div
                    className="absolute left-0 bottom-0 h-1 w-1/3 bg-blue-500 transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${tabIndex * 100}%)` }}
                ></div>
            </div>

            <MenuCard activeTab={activeTab} session={session} />
        </div>
    );
};

export default TabMenu;