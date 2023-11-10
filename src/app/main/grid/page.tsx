import React from 'react';
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";

const Page = () => {
    return (
        <>
            <Navbar/>
            <div className="container mx-auto px-4">
                <div className="min-h-screen grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-gray-300 p-4 min-h-full">1</div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-gray-300 p-4 min-h-full">2</div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-gray-300 p-4 min-h-full">3</div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-gray-300 p-4 min-h-full">4</div>
                    {/* ...다른 아이템들 */}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Page;
