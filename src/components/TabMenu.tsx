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
    {label: '학색'},
    {label: '기숙사'},
]

const TabMenu = ({session}: Props) => {
    const [activeTab, setActiveTab] = useState('교직원');

    return (
        <div className="m-5 mr-0 mb-0 col-span-1 bg-white md:col-span-2">
            <div className="flex border-b mb-4">
                {tabList.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`py-2 px-4 w-full text-center ${activeTab === `${item.label}` ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <MenuCard
                activeTab={activeTab}
                session={session}
            />
        </div>
    );
};

export default TabMenu;