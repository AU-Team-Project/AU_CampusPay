import React from 'react';
import UserIcon from "@/components/ui/icons/UserIcon";
import {BsThreeDotsVertical} from "react-icons/bs";

const test = [
    {
        id: 1,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    },
    {
        id: 2,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    },
    {
        id: 3,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    }
]

const CustomerPage = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Name</span>
                        <span className='sm:text-left text-right'>Email</span>
                        <span className='hidden md:grid'>Last Order</span>
                        <span className='hidden sm:grid'>Method</span>
                    </div>
                    <ul>
                        {test.map((order, id) => (
                            <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='bg-purple-100 p-3 rounded-lg'>
                                        <UserIcon/>
                                    </div>
                                    <p className='pl-4'>{order.name.first + ' ' + order.name.last}</p>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right'>{order.name.first}@gmail.com</p>
                                <p className='hidden md:flex'>{order.date}</p>
                                <div className='sm:flex hidden justify-between items-center'>
                                    <p>{order.method}</p>
                                    <BsThreeDotsVertical />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;