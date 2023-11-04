import React from 'react';
import Sidebar from "@/components/admin/Sidebar";


const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex bg-gray-50'>
            <Sidebar/>
            <main className="w-full mx-0">
                {children}
            </main>
        </div>
    );
};

export default Layout;