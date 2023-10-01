import React from 'react';
import Sidebar from "@/components/admin/Sidebar";


const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex'>
            <Sidebar/>
            <main className="w-full ml-20 bg-gray-50">
                {children}
            </main>
        </div>
    );
};

export default Layout;