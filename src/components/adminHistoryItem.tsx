import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const AdminHistoryItem = async () => {
    const session = await getServerSession(options);
    if(!session?.user.role || !session) {
        window.location.href='/';
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    return (
        <section className="p-5 w-full">
            <article className="p-5 bg-white shadow-md">
                <div className="mx-[20px] min-h-[500px]">
                    <span className="text-[27px] font-semibold text-blue-custom">
                        최근 구매 내역
                    </span>
                    <table className="w-full mb-[50px] border-gray-300">
                        <thead>
                        <tr className=" text-center font-semibold">
                            <th className="w-1/4 px-2 py-5 border-none">이름</th>
                            <th className="w-1/4 px-2 py-5">결제 가격</th>
                            <th className="w-1/4 px-2 py-5 border-none">구매 상품</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.slice(0, 8).map((payment: any, index: number) => (
                            <tr
                                key={index}
                                className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="w-1/4 px-2 py-[1%] border-none">
                                    {payment.name}
                                </td>
                                <td className="w-1/4 px-2 py-[1%]">
                                    {payment.amount}원
                                </td>
                                <td className="w-1/4 px-2 py-[1%] border-none">
                                    {payment.menu}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    );
};

export default AdminHistoryItem;