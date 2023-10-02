import React from 'react';
import Sidebar from "@/components/admin/Sidebar";


const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex bg-gray-50'>
            <Sidebar/>
            <main className="flex-1 w-full md:ml-20 mt-[80px] md:mb-0 mb-[110px] mx-0">
                {children}
            </main>
        </div>
    );
};

export default Layout;