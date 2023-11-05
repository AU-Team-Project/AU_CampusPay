'use client'
import React, {useState} from 'react';
import PaymentBtn from "@/components/ui/PaymentBtn";
import XMarkIcon from "@/components/ui/Icons/XmarkIcon";
import Link from "next/link";

// activeTab 문자열 타입
type activeTab = '학생' | '교직원' | '기숙사';

// 유저가 선택한 상품의 타입
type productItem = {
    label: string;
    price: number;
    quantity: number;
}

// 메뉴 데이터 배열로 정의
const menuData: Record<activeTab, { label: string; price: number; }[]> = {
    '학생': [
        {label: '학생 중식1', price: 4000},
        {label: '학생 중식2', price: 4000}
    ],
    '교직원': [
        {label: '교직원 중식', price: 5000}
    ],
    '기숙사': [
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
            <div className="col-span-2 flex flex-col items-center">
                <div className="w-[900px] h-[70px] flex border-b mb-[35px] text-[22px] text-white bg-[#454545] rounded-[5px]">
                    <button
                        onClick={() => setActiveTab('학생')}
                        className={`py-2 px-4 w-full text-center ${activeTab === '학생' ? 'bg-[#009223] font-bold rounded-l-[5px] rounded-r-[50px]' : ''}`}
                    >학생
                    </button>
                    <button
                        onClick={() => setActiveTab('교직원')}
                        className={`py-2 px-4 w-full text-center ${activeTab === '교직원' ? 'bg-[#009223] font-bold rounded-[50px]' : ''}`}
                    >교직원
                    </button>
                    <button
                        onClick={() => setActiveTab('기숙사')}
                        className={`py-2 px-4 w-full text-center ${activeTab === '기숙사' ? 'bg-[#009223] font-bold rounded-l-[50px] rounded-r-[5px]' : ''}`}
                    >기숙사
                    </button>
                </div>

                <div className="grid grid-cols-1">
                    {menuData[activeTab].map((item, idx) => (
                        <div key={idx} className="flex gap-3 bg-white mb-[30px] w-[900px] h-[100px] rounded-[5px]">
                            <div className="m-3 min-w-[460px] grid grid-cols-2 grid-rows-2 leading-[35px]">
                                <h4 className="font-bold text-[22px]">{item.label}</h4>
                                <p className="text-[#FFCE32] font-semibold text-right">{item.price} 원</p>
                                <h3 className="text-[#555555]">메뉴 메뉴 메뉴 메뉴</h3> {/* 오늘의 메뉴 구성 추가 예정  */}
                                <p className="text-right">2023.11.04</p> {/* 메뉴에 담긴 오늘의 날짜 추가 예정 */}
                            </div>
                            <button className="ml-[320px] m-3 w-[75px] h-[75px] bg-[#ececec] text-white font-medium text-[55px] rounded-[5px]"
                                    onClick={() => handleItemClick(item.label, item.price)}>
                                +
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                {selectedItem ? (
                    <ul className="relative w-[900px] h-[150px] bg-[#ececec] leading-[150px] text-center rounded-[5px]">
                        <li key={selectedItem.label} className="my-8 mx-14">
                            <div className="m-3 min-w-[760px] grid grid-cols-2 grid-rows-2 gap-[17px] leading-[35px]">
                                <p className="text-[22px] text-[#555555] text-left">{selectedItem.label}</p>
                                <p></p>
                                <p className="text-[18px] text-[#555555] text-left">메뉴 메뉴 메뉴 메뉴</p>
                                <p className="text-[18px] text-[#3284FF] text-right">
                                    결제금액: {selectedItem ? selectedItem.price * selectedItem.quantity : 0} 원
                                </p>
                            </div>
                            <button className="absolute p-5 right-0 top-0" onClick={handleItemDeselection}>
                                <XMarkIcon/>
                            </button>
                        </li>
                    </ul>
                ): (
                    <ul className="w-[900px] h-[150px] bg-[#ececec] text-[#555555] text-center rounded-[5px]">
                        <li className="my-16">
                            장바구니가 비었습니다.
                        </li>
                    </ul>
                )}

                <div className="flex justify-center gap-[300px] mt-[30px]">
                    <Link href={'/'}>
                        <div className={'bg-[#393939] font-semibold text-center leading-[65px] text-white w-[300px] h-[65px] rounded-[5px]'}>
                            돌아가기
                        </div>
                    </Link>
                    <PaymentBtn
                        props={selectedItem}
                        className={'bg-[#009223] font-semibold text-white w-[300px] h-[65px] rounded-[5px]'}
                    />
                </div>
            </div>

        </>
    );
};

export default PaymentContainer;