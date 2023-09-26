import React from 'react';

const Page = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/admin/edit`);
    const data = res.json()
    console.log(data)

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