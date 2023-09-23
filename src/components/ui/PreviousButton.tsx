'use client'
import React from 'react';
import {useRouter} from "next/navigation";

type PreviousButtonProps = {
    props: string;
    className?: string;
}

const PreviousButton = ({props, className}: PreviousButtonProps) => {
    const router = useRouter();
    const handlePrevious= () => {
        router.push('/')
    }

    return (
        <button className={className} onClick={handlePrevious}>
            {props}
        </button>
    );
};

export default PreviousButton;