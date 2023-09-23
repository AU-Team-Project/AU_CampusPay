'use client'
import React from 'react';
import {useRouter} from "next/navigation";

type PreviousButtonProps = {
    props: string;
}

const PreviousButton = ({props}: PreviousButtonProps) => {
    const router = useRouter();
    return <button onClick={()=> router.back()}>{props}</button>
};

export default PreviousButton;