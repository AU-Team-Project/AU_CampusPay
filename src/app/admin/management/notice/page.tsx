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

const NoticeManagementPage = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const findData = data.data;
    console.log(findData._id)

    return (
        <div>
            {findData.map((item: noticeData) => (
                <Link
                    key={item._id.toString()}
                    href={`/admin/edit/find?post=${item._id}`}
                >
                    Edit
                </Link>
            ))}
        </div>
    );
};

export default NoticeManagementPage;