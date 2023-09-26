import React from 'react';
import Link from "next/link";
import {ObjectId} from "mongodb";

type noticeData = {
    _id: ObjectId,
    username: string;
    user_id: ObjectId;
    title: string;
    content: string;
    time: string;
}

const Page = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const findData = data.data;
    console.log(`data : ${findData}`)
    console.log(data)
    console.log(`findData title : ${findData[1].title}`)
    console.log(`findData content : ${findData[1].content}`)
    console.log(`findData user_id : ${findData[1].user_id}`)

    return (
        <div>
            {findData.map((item: noticeData) => (
                <Link key={item._id.toString()} href={`/admin/edit/${item._id}`}>
                    Edit
                </Link>
            ))}
        </div>
    );
};

export default Page;