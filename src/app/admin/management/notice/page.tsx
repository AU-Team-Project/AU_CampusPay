import React from 'react';
import Link from "next/link";

const Page = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/admin/find`);
    const data = await res.json();
    const findData = data.data;
    console.log(data)
    console.log(`findData title : ${findData.title}`)
    console.log(`findData content : ${findData.content}`)
    console.log(`findData user_id : ${findData.user_id}`)

    return (
        <div>
            <Link href={'/admin/edit/65116a17f616d9ff084454f9'}>
                Edit
            </Link>
        </div>
    );
};

export default Page;