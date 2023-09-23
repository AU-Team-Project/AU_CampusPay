'use client'
import React, {useState} from 'react';
import PreviousButton from "@/components/ui/PreviousButton";
import PaymentBtn from "@/components/ui/PaymentBtn";
import CookItem from "@/components/CookItem";

type activeTab = '교직원' | '학생';

const menuData: Record<activeTab, {label: string; price:number;}[]> = {
    '교직원': [
        {label: '교직원 중식', price: 5000}
    ],
    '학생': [
        {label: '학생 조식', price: 1000},
        {label: '학생 중식1', price: 4000},
        {label: '학생 중식2', price: 4000},
        {label: '학생 석식', price: 4000}
    ]
};

const PaymentContainer = () => {
    const [activeTab, setActiveTab] = useState<activeTab>('교직원');
    const [selectedItem, setSelectedItem] = useState({name: '', amount: 0});

    const handleItemClick = (name: string, amount: number) => {
        setSelectedItem({name, amount});
    };

    return (
        <>
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
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {menuData[activeTab]?.map((item) => (
                            <CookItem
                                key={item.label}
                                props={`${item.label} ${item.price}`}
                                onClick={() => handleItemClick(item.label, item.price)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-around mt-6">
                <PreviousButton props={'취소'}/>
                <PaymentBtn props={selectedItem}/>
            </div>
        </>
    );
};

export default PaymentContainer;