import React from 'react';
import Link from "next/link";
import Image from "next/image";

const SmallNavbar = () => {
    return (
        <div className="w-[100vw] p-5 shadow">
            <Link className="w-[225px] flex items-center gap-1" href="/">
                <Image
                    src="/AUCampusPay_Yellow.svg"
                    width={225}
                    height={100}
                    alt="웹페이지 로고"
                />
            </Link>
        </div>
    );
};

export default SmallNavbar;