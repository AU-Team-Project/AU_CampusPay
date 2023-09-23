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
        <div>
            <TopNavbar/>
            <main>
                TicketPage
                {data.data.map((item: Menu) => (
                    <div key={item._id}>
                        <Link href={`/confirmation/${item._id}`}>
                            <p>{item.menu}</p>
                            <p>{item.name}</p>
                        </Link>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default TicketPage;