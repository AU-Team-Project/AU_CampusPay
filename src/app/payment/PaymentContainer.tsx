'use client'
import React, {useState} from 'react';
import PreviousButton from "@/components/ui/PreviousButton";
import PaymentBtn from "@/components/ui/PaymentBtn";
import CookItem from "@/components/CookItem";
import XMarkIcon from "@/components/ui/icons/XmarkIcon";

// activeTab 문자열 타입
type activeTab = '교직원' | '학생';

// 유저가 선택한 상품의 타입
type productItem = {
    label: string;
    price: number;
    quantity: number;
}

// 메뉴 데이터 배열로 정의
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
    const [selectedItem, setSelectedItem] = useState<productItem | null>(null);
    /**
     * ### 상품 클릭 이벤트 핸들러
     * label: 상품 이름
     * price: 선택한 상품 가격
     * quantity: 선택한 상품 수량
     */
    const handleItemClick = (label: string, price: number) => {
        if (selectedItem && selectedItem.label === label) {
            setSelectedItem({
                ...selectedItem,
                quantity: selectedItem.quantity + 1
            });
        } else {
            setSelectedItem({
                label,
                price,
                quantity: 1
            });
        }
    };

    // 상품 해제 이벤트 핸들러
    const handleItemDeselection = () => {
        setSelectedItem(null);
    }

    return (
        <>
            <div className="m-5 mb-0 min-h-[60vh] col-span-2 bg-white">
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

                <div className="grid grid-cols-1 gap-4">
                    {menuData[activeTab].map((item, idx) => (
                        <div key={idx} className="border p-2 rounded" onClick={() => handleItemClick(item.label, item.price)}>
                            <h4 className="font-bold">{item.label}</h4>
                            <p>{item.price} 원</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='p-5 border-4'>
                {selectedItem && (
                    <ul>
                        <li key={selectedItem.label} className="flex justify-between items-center">
                            <p>{selectedItem.label}</p>
                            <p>{selectedItem.quantity} × {selectedItem.price} 원</p>
                            <button onClick={handleItemDeselection}>
                                <XMarkIcon/>
                            </button>
                        </li>
                    </ul>
                )}

                <div className="mt-4 text-right">
                    <h3 className="font-bold">
                        결제금액: {selectedItem ? selectedItem.price * selectedItem.quantity : 0} 원
                    </h3>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <PreviousButton
                    props={'돌아가기'}
                    className={'bg-white font-bold border-2 border-blue-600 py-3 px-10 rounded'}
                />
                <PaymentBtn
                    props={selectedItem}
                    className={'bg-blue-600 font-bold text-white py-3 px-10 rounded'}
                />
            </div>
        </>
    );
};

export default PaymentContainer;