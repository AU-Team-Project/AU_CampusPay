import React from 'react';
import HistoryItem from "@/components/HistoryItem";
import PreviousButton from "@/components/ui/PreviousButton";
import {Menu} from "@/model/menu";

type Props = {
    params: {
        slug: string;
    }
}

const ProfilePage = async ({params}: Props) => {
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/${params.slug}`)
    const data = await res.json();
    const fetchData = await data.data[1]
    console.log(`User ${params.slug}`)
    console.log(`data ${fetchData.state}`)

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className='flex items-center justify-between'>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">결제 내역</h1>
                    <PreviousButton props={'돌아가기'}/>
                </div>
                <div className="space-y-4">
                    {/** ### Single Payment History Item : 블록을 복사하여 더 많은 결제 내역 항목을 생성할 수 있습니다. */}
                    <HistoryItem
                        menu={'조식'}
                        date={'2023-09-12'}
                        status={'완료'}
                    />
                    <HistoryItem
                        menu={'조식'}
                        date={'2023-09-12'}
                        status={'취소'}
                    />
                    {data.data.map((item: Menu) => (
                        <HistoryItem key={item._id} menu={item.menu} date={'2023-09-12'} status={'미사용'}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;