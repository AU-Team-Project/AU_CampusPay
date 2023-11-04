import React from "react";
import Image from 'next/image';
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

import TopNavbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <>
            <TopNavbar/>
            <main className='min-h-screen max-h-full bg-gray-200 text-white'>
                {/* 인덱스 페이지 섹션 1 */}
                <section className='h-screen flex bg-section1-color'>
                    <div>
                        <Image
                            src={'/img/index/Project.svg'}
                            alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className='text-[50px]'>
                                점심을 위한 더 나은 방법
                            </h1>
                            <p className='text-[27px]'>
                                AU CampusPay는 안산대학교 학생을 위한,<br/>
                                빠르고 간편한 식권 구입 시스템입니다.
                            </p>
                        </div>
                        <div>
                            <h1 className='text-[30px] font-semibold'>
                                빠르고 쉬운 식권 인증 시스템.
                            </h1>
                            <p className='text-[22px]'>
                                온라인 구매와 QR코드 인증 시스템이 합쳐진 빠른 인증 시스템을 활용한<br/>
                                더 나은 시스템을 제공합니다.
                            </p>
                        </div>
                    </div>
                </section>
                {/* 인덱스 페이지 섹션 2 */}
                <section className='h-screen flex bg-section2-color'>
                    <div>
                        <Image
                            src={'/img/index/Iphone.svg'}
                            alt={'메인페이지 두 번째 소개 섹션 이미지'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className='text-[50px]'>
                                앉은 자리에서 간편하게 구매.
                            </h1>
                            <p className='text-[27px]'>
                                핸드폰과 노트북만으로 카카오페이를 이용해,<br/>
                                그 자리에서 간편하게 식권을 구매할 수 있습니다.
                            </p>
                        </div>
                        <button className='w-[720px] h-[80px] text-[35px] font-medium bg-footer-color rounded-[10px]'>
                            식권 구매하기
                        </button>
                    </div>
                </section>
                {/* 인덱스 페이지 섹션 3 */}
                <section className='h-screen flex bg-section3-color'>
                    <div>
                        <Image
                            src={'/img/index/Scanner.svg'}
                            alt={'메인페이지 스캐너 섹션 이미지'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <h1 className='text-[50px]'>
                            배치된 스캐너를 이용한 간편 인증.
                        </h1>
                        <p className='text-[27px]'>
                            카페테리아에 비치된 스캐너에, QR 식권을 스캐너에 비추는 것 만으로,<br/>
                            끝나는 빠르고 간편한 인증을 할 수 있습니다.
                        </p>
                    </div>
                </section>
                {/* 인덱스 페이지 섹션 4 */}
                <section className='h-screen flex bg-section4-color'>
                    <div>
                        <Image
                            src={'/img/index/Calendar.svg'}
                            alt={'메인페이지 식단표 섹션 이미지'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className='text-[50px] font-semibold'>
                                보기 쉬운 식단표
                            </h1>
                            <p className='text-[27px]'>
                                식당 별로 매 주 단위로 정리된 식단표를 통해,<br/>
                                빠르고 직관적으로 식단을 파악할 수 있습니다.
                            </p>
                        </div>
                        <button className='w-[300px] h-[80px] text-[35px] font-medium bg-footer-color rounded-[10px]'>
                            식단표 보러가기
                        </button>
                    </div>
                </section>
                {/* 인덱스 페이지 섹션 5 */}
                <section className='h-screen flex bg-section5-color'>
                    <div>
                        <Image
                            src={'/img/index/Chatbot.svg'}
                            alt={'메인페이지 챗봇 섹션 이미지'}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className='text-[50px]'>
                                챗봇을 통한 안내 시스템
                            </h1>
                            <p className='text-[27px]'>
                                AU CampusPay의 카카오톡 챗봇을 추가하면,<br/>
                                각종 이용 안내 및 오류 해결 방안을 얻을 수 있습니다.
                            </p>
                        </div>
                        <button className='w-[335px] h-[80px] bg-footer-color font-medium text-[35px] rounded-[10px]'>
                            챗봇 추가하기
                        </button>
                    </div>
                </section>
                {/*<div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
                    <TabMenu session={session}/>
                    <QuickMenu session={session}/>
                    <Announcement/>
                </div>*/}
            </main>
            <Footer/>
        </>
    )
}