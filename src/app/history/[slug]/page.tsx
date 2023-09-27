import React from 'react';
import HistoryItem from "@/components/HistoryItem";
import PreviousButton from "@/components/ui/PreviousButton";
import {Menu} from "@/model/menu";
import PageNavigator from "@/components/ui/PageNavigator";

type Props = {
    params: {
        slug: string;
    }
}

const ProfilePage = async ({params}: Props) => {
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/${params.slug}`)
    const data = await res.json();
    const fetchData = await data.data;

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className='flex items-center justify-between'>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">{params.slug}님 결제 내역</h1>
                    <PreviousButton props={'돌아가기'}/>
                </div>
                <div className="space-y-4">
                    {fetchData.map((item: Menu) => (
                        <HistoryItem
                            key={item._id}
                            menu={item.menu}
                            date={item.time}
                            status={'미사용'}
                        />
                    ))}
                </div>
                <PageNavigator/>
            </div>
        </div>
    );
};

export default ProfilePage;