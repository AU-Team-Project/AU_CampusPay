'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {getMonthAndDay, getFormattedDate} from "@/service/date";
import {User} from "@/model/user";
import {ObjectId} from "mongodb";

type Props = {
    activeTab: string;
    session: {
        user: User;
    }
}

type Menu = {
    _id: ObjectId;
    date: string;
    menu: string[];
    price: number;
    role: string;
}

const MenuCard = ({activeTab, session}: Props) => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const formattedDate = getFormattedDate();
    const {month, day} = getMonthAndDay();
    const todayDate = `${month}월 ${day}일`;

    useEffect(() => {
        fetch('/api/cooks')
            .then((res) => res.json())
            .then((data) => {
                const todayMenus = data.data.filter((todayMenu: Menu) => {
                    return todayMenu.date === formattedDate && todayMenu.role === activeTab;
                });
                setMenus(todayMenus);
            });
    }, [activeTab]);

    return (
        <>
            {menus.length === 0 ? (
                <div className="flex flex-col justify-center min-h-[200px] rounded">
                    <p className='w-20 mx-auto mb-2 border-2 font-semibold text-center bg-stone-200 border-black-500 rounded-lg'>
                        {todayDate}
                    </p>
                    <p className="mx-auto min-h-full text-center p-0.5 min font-medium text-[18px]">
                        오늘의 메뉴가 없습니다.
                    </p>
                </div>
            ) : (
                menus.map((items, index) => (
                    <div className="grid grid-cols-2 gap-4 m-auto mt-10">
                        <div
                            className="w-11/12 min-h-[125px] p-5 border-solid border-2 border-black-500 ml-auto mx-auto mb-5 rounded"
                            key={index}
                        >
                            <div
                                className="w-fit px-5 m-auto text-center font-semibold -translate-y-9 border-solid border-2 border-black-500 rounded-lg bg-stone-200">
                                {todayDate}
                            </div>
                            <div className='mx-auto min-h-full text-center'>
                                {items.menu.map((item: string, index: number) => (
                                    <p
                                        className="p-0.5 min text-center font-medium text-[18px]"
                                        key={index}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )))}
        </>
    );
};

export default MenuCard;