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
    const res = await fetch(`http://localhost:3000/api/confirmation/${params.slug}`)
    const data = await res.json();
    const qrData = data.data[1];
    console.log(qrData)

    return (
        <>
            <TopNavbar/>
            <main className='mx-5'>
                {data.data.slice(1).map((item: Menu) => (
                    <div key={item._id} className='max-w-2xl m-auto my-5 p-5 flex justify-between border-2'>
                        <Link href={`/confirmation/${item._id}`}>
                            <p>{item.menu}</p>
                            <p>{item.amount}원</p>
                        </Link>
                        <button className="mt-6 px-2 py-2 bg-red-500 text-white text-xs rounded-full font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300">
                            취소요청
                        </button>
                    </div>
                ))}
            </main>
        </>
    );
};

export default TicketPage;