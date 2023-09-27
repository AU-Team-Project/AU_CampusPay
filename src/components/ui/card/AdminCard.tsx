import React from 'react';
import AdminTicketIcon from "@/components/ui/icons/AdminTicketIcon";
import AdminTodayPriceIcon from "@/components/ui/icons/AdminTodayPriceIcon";
import UserIcon from "@/components/ui/icons/UserIcon";

type Props = {
    data: {
        totalTicket: number;
        totalAmount: number;
        profit: number;
    }
}

const AdminCard = ({ data }: Props) => {
    const ticket = [
        {
            label: '일일 방문자',
            value: '???',
            icon: <UserIcon/>
        },
        {
            label: '일일 판매 티켓',
            value: data.totalTicket,
            icon: <AdminTicketIcon/>
        },
        {
            label: '일일 판매 금액',
            value: data.totalAmount,
            icon: <AdminTodayPriceIcon/>
        },
        {
            label: '일일 순수익',
            value: data.profit,
            icon: <AdminTodayPriceIcon/>
        },
    ]
    console.log('data : ', data)

    return (
        <section className="mt-6 p-5 grid grid-cols-4 gap-7 relative">
            {ticket.map((item, index) => (
                <article
                    key={index}
                    className="mt-5 p-7 flex justify-between text-center bg-blue-100 shadow-lg hover:bg-blue-500 hover:text-black transition-colors font-bold relative"
                >
                    <div className='text-blue-custom '>
                        <div className='pb-5 text-2.5xl font-medium'>
                            {item.label}
                        </div>
                        <div className='text-4xl font-medium'>
                            {item.value}
                        </div>
                    </div>
                    <div className='px-5 flex items-center justify-center gap-3  text-4xl '>
                        {item.icon}
                    </div>
                </article>
            ))}
        </section>
    );
};

export default AdminCard;