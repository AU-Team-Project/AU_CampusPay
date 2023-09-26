import React from 'react';

type Props = {
    slug: string;
}

const Page = async (params: Props) => {
    const res = await fetch(`${process.env.SITE_URL}/api/admin/find`);
    const data = await res.json();
    const findData = data.data;
    console.log(findData)
    console.log(params)

    return (
        <div>
            <h2>수정 페이지</h2>
            <form action='' method=''>
                <input type="text" name="username" className='border-2' />
                <input type="text" name="title" className='border-2' />
                <textarea name="content" className='border-2'/>
                <button type='submit'>제출</button>
            </form>
        </div>
    );
};

export default Page;