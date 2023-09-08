import React from "react";
import '@/app/globals.css';
import Link from "next/link";
import {Inter} from 'next/font/google'
import AuthProvider from "@/app/context/AuthProvider";
import type {Metadata} from 'next'
import Script from "next/script";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>AU App</title>
        </head>
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />
        <body className={inter.className}>
        <AuthProvider>
            <div className='mx-auto w-1/2 p-4'>
                <h2 className='text-2xl font-bold'>임시 페이지</h2>
                <div>메인 페이지 : <Link href={'/'}>메인</Link></div>
                <div>로그인 페이지 : <Link href={'/login'}>로그인</Link></div>
                <div>로그인 페이지 : <Link href={'http://localhost:3000/api/auth/signin/github'}>깃허브로그인</Link></div>
                <div>로그아웃 : <Link href={'http://localhost:3000/api/auth/signout/github'}>로그아웃</Link></div>
                <div>어드민 페이지 : <Link href={'/admin'}>어드민</Link></div>
                <div>결제 페이지 : <Link href={'/payment'}>페이팔</Link></div>
                <div>결제 페이지 : <Link href={'/kg'}>이니시스</Link></div>
                <div>결제 페이지 : <Link href={'/v2'}>이니시스 V2</Link></div>
                <div>QR 출력 페이지 : <Link href={'/qrtest'}>QR Code</Link></div>
            </div>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}