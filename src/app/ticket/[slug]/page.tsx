import React from 'react';
import TopNavbar from "@/components/Navbar";
import {Menu} from "@/model/menu";
import Link from "next/link";

type Props = {
    params: {
        slug: string;
    }
}

const TicketPage = async ({params}: Props) => {
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/${params.slug}`)
    const data = await res.json();
    const qrData = data.data[1];
    console.log(qrData)

    return (
        <>
            <TopNavbar/>
            <main className='mx-5'>
                {data.data.slice(1).map((item: Menu) => (
                    <div key={item._id} className='max-w-2xl m-auto my-5 p-5 flex justify-between border border-gray-200 rounded-lg shadow-md bg-white'>
                        <div className="flex-grow">
                            <Link href={`/confirmation/${item._id}`}>
                                <div className="cursor-pointer">
                                    <p className="text-gray-700 font-medium mb-2">[{item.state}] {item.menu}</p>
                                    <p className="text-xl font-bold">{item.amount}원</p>
                                    <p className="text-xl font-bold">임시값 : {item._id}</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            {item.state === '미사용' && (
                                <button className="mt-6 px-4 py-2 bg-red-500 text-white text-xs rounded-full font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300">
                                    취소요청
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
};

export default TicketPage;