'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";

interface MainPageSectionProps {
    session?: {
        user?: {
            username?: string;
        }
    }
}

const MainPageSection = ({session}: MainPageSectionProps) => {
    return (
        <div className='grid grid-cols-12'>
            {/* 인덱스 페이지 섹션 1 */}
            <section className='min-h-screen col-span-12 grid place-items-center'>
                <div className='grid grid-cols-2 gap-5 max-w-7xl mx-auto'>
                    {/* 요소1 */}
                    <div>
                        <Image
                            src={'/img/index/Project.svg'}
                            alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                            width={456}
                            height={457}
                        />
                    </div>
                    {/* 요소2 */}
                    <div>
                        <div className='text-black-color'>
                            <h1 className='text-[50px] font-bold'>
                                점심을 위한 더 나은 방법
                            </h1>
                            <p className='text-[27px]'>
                                AU CampusPay는 안산대학교 학생을 위한,<br/>
                                빠르고 간편한 식권 구입 시스템입니다.
                            </p>
                            <div className='flex gap-7 mt-10'>
                                <Image
                                    src={'/img/index/QR_Example.svg'}
                                    alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                                    width={163}
                                    height={163}
                                />
                                <div>
                                    <h1 className='text-[30px] font-semibold'>
                                        빠르고 쉬운 식권 인증 시스템.
                                    </h1>
                                    <p className='text-[22px]'>
                                        온라인 구매와 QR코드 인증 시스템이 합쳐진<br/>
                                        빠른 인증 시스템을 활용한 더 나은 시스템을<br/>
                                        제공합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 2*/}
            <section className='min-h-screen col-span-12 grid place-items-center bg-section2-color'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto w-full px-4'>
                    {/* 이미지 컨테이너 */}
                    <div>
                        <Image
                            src={'/img/index/Iphone.svg'}
                            alt={'메인페이지 두 번째 소개 섹션 이미지'}
                            width={330}
                            height={381}
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-4xl font-bold text-section2-text-color mb-5'>
                            앉은 자리에서<br/>간편하게
                        </h1>
                        <p className='text-xl text-sub-font-color leading-loose'>
                            핸드폰과 노트북만으로 카카오페이를 이용해,<br/>
                            그 자리에서 간편하게 식권을 구매할 수 있습니다.
                        </p>
                        <Link
                            className='w-40 h-10 text-lg flex justify-center items-center font-medium bg-section2-color border-2 border-primary-color text-primary-color rounded-lg mt-10'
                            href={`/payment/${session?.user?.username}`}>
                            식권 구매하기
                        </Link>
                    </div>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 3*/}
            <section className='min-h-screen col-span-12 grid grid-cols-2 place-items-center bg-section3-color'>
                <div> {/* 이미지 컨테이너 */}
                    <Image
                        src={'/img/index/Scanner.svg'}
                        alt={'메인페이지 스캐너 섹션 이미지'}
                        width={560}
                        height={684}
                    />
                </div>
                <div className='flex flex-col justify-center'> {/* 텍스트 컨테이너 */}
                    <h1 className='mb-5 font-bold text-[70px] text-section3-text-color'>
                        스캐너를 이용한<br/>
                        간편 인증.
                    </h1>
                    <p className='text-[22px] text-sub-font-color leading-loose'>
                        카페테리아에 비치된 스캐너에, QR 식권을<br/>
                        스캐너에 비추는 것 만으로, 끝나는 빠르고<br/>
                        간편한 인증을 할 수 있습니다.
                    </p>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 4 */}
            <section className='min-h-screen col-span-12 grid grid-cols-2 place-items-center bg-section4-color'>
                <div>
                    <Image
                        src={'/img/index/Calendar.svg'}
                        alt={'메인페이지 식단표 섹션 이미지'}
                        width={650}
                        height={300}
                    />
                </div>
                <div className='flex flex-col justify-center p-4'>
                    <h1 className='mb-5 text-4xl font-bold text-section4-text-color'>
                        보기 쉬운 식단표
                    </h1>
                    <p className='text-xl text-sub-font-color leading-loose'>
                        식당 별로 매 주 단위로 정리된 식단표를 통해,<br/>
                        빠르고 직관적으로 식단을 파악할 수 있습니다.
                    </p>
                    <Link
                        className='inline-block mt-10 w-38 h-12 text-lg text-center leading-[3rem] font-medium bg-section4-color text-primary-color border-2 border-primary-color rounded-lg'
                        href={'/'}
                    >
                        식단표 보러가기
                    </Link>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 5*/}
            <section className='min-h-screen col-span-12 grid grid-cols-2 place-items-center bg-section5-color'>
                <div>
                    <Image
                        src={'/img/index/Chatbot.svg'}
                        alt={'메인페이지 챗봇 섹션 이미지'}
                        width={543}
                        height={515}
                    />
                </div>
                <div className='flex flex-col justify-center p-4'>
                    <h1 className='mb-5 text-4xl font-bold text-section5-text-color'>
                        챗봇을 통한 안내 시스템
                    </h1>
                    <p className='text-xl text-sub-font-color leading-loose'>
                        AU CampusPay의 카카오톡 챗봇을 추가하면,<br/>
                        각종 이용 안내 및 오류 해결 방안을 얻을 수 있습니다.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MainPageSection;