'use client'
import React, { useEffect, useState } from 'react';
import PaymentBtn from "@/app/payment/PaymentBtn";

const TapMenu = () => {
    const [activeTab, setActiveTab] = useState('교직원');
    /* TODO - 임시 데이터 추가시 타입 재정의 예정 */
    const [text, setText] = useState<any[]>([]);
    const [todayDate, setTodayDate] = useState<string>('데이터 로딩중...'); // 초기에 "데이터 로딩중..."으로 설정

    useEffect(() => {
        fetch('/api/cooks')
            .then((res) => res.json())
            .then((data) => {
                const today = new Date();
                const y = today.getFullYear();
                const m = today.getMonth() + 1;
                const d = today.getDate();

                const todayMenus = data.data.filter((menu) => {
                    return menu.date.y === y && menu.date.m === m && menu.date.d === d && menu.role === activeTab;
                });

                setText(todayMenus.length > 0 ? todayMenus.map((menu) => menu.menu.join(", ")) : ['오늘의 메뉴가 없습니다.']);
                setTodayDate(`${m}월 ${d}일`);
            });
    }, [activeTab]);
    const selectedItem = 21;

    const renderMenus = () => {
        return text.map((menuText, index) => (
            <div className="w-1/3 min-h-fit max-h-100 p-10 border-solid border-2 border-black-500 ml-auto mr-auto mb-5 rounded" key={index}>
                <div className="w-fit px-5 m-auto text-center font-semibold -translate-y-12 border-solid border-2 border-black-500 rounded-lg bg-stone-200">{todayDate}</div>
                {String(menuText).split(",").map((item, itemIndex) => (
                    <div className="p-0.5 text-center font-medium" key={itemIndex}>
                        {item}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="m-5 mb-0 col-span-2 bg-white">
            <div className="flex border-b mb-4">
                <button
                    onClick={() => setActiveTab('교직원')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '교직원' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >교직원
                </button>
                <button
                    onClick={() => setActiveTab('학생')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '학생' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >학생
                </button>
                <button
                    onClick={() => setActiveTab('기숙사')}
                    className={`py-2 px-4 w-full text-center ${activeTab === '기숙사' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                >기숙사
                </button>
            </div>
            <div className='flex m-auto'>
                {renderMenus()}
            </div>
        </div>
    );
};

export default TapMenu;
