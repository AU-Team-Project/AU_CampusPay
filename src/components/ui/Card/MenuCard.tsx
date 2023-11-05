'use client'
import React, {useEffect, useState} from 'react';
import {getMonthAndDay, getFormattedDate, formatDate} from "@/service/date";
import {User} from "@/model/user";
import {ObjectId} from "mongodb";

interface Props {
    activeTab: string;
    session: {
        user: User;
    }
}

interface Menu {
    _id: ObjectId;
    date: string;
    menu: string[];
    price: number;
    cook_id: number;
}

interface ApiResponse {
    data: Menu[];
}


const cookIdMapping = {
    교직원: [400001],
    학생: [200001, 200002],
    기숙사: [100001, 300001],
};

type ActiveMenu = keyof typeof cookIdMapping;


interface MenuListProps {
    items: Menu;
    todayDate: string;
}

const NoMenuMessage = () => (
    <div className="flex flex-col justify-center min-h-[200px] rounded">
        <p className="text-center font-medium text-[18px]">
            오늘의 메뉴가 없습니다.
        </p>
    </div>
)

const MenuList = ({ items, todayDate }: MenuListProps) => (
    <div className="menu-card">
        <div className="menu-date">{todayDate}</div>
        <div className='text-center'>
            {items.menu.map((item, index) => (
                <p className="menu-item" key={index}>{item}</p>
            ))}
        </div>
    </div>
);

const MenuCard = ({activeTab, session}: Props) => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const formattedDate = formatDate(new Date());
    const {month, day} = getMonthAndDay();
    const todayDate = `${month}월 ${day}일`;

    useEffect(() => {
        const cookIds = cookIdMapping[activeTab as ActiveMenu];
        if (!cookIds) {
            if (process.env.NODE_ENV === 'development') {
                console.error(`Invalid menu: ${activeTab}`);
            }
            return;
        }

        fetch('/api/cook')
            .then((res) => res.json())
            .then((data: ApiResponse) => {
                const filteredMenus = data.data.filter((menu: Menu) =>
                    cookIds.includes(menu.cook_id) && menu.date === formattedDate
                );
                setMenus(filteredMenus);
            });
    }, [activeTab]);

    return (
        <div className="grid grid-cols-2 gap-4 m-auto mt-10">
            {menus.length === 0 ?
                <NoMenuMessage/> : menus.map((items, index) =>
                    <MenuList
                        key={index}
                        items={items}
                        todayDate={todayDate}
                    />
                )}
        </div>
    );
};

export default MenuCard;