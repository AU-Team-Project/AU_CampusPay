import React from 'react';
import Image from "next/image";
import TopNavbar from "@/components/nav/Navbar";

const Page = () => {
    return (
        <>
            <TopNavbar/>
            <div className={'min-w-[980px] max-w-max-[2634px] mx-24'}>
                {/*<div className="w-full h-[80px] mb-5 flex-1 border-solid border-2">Navigation</div>
            <div className="w-full h-full flex flex-row border-solid border-2">
                <div className="flex-1 h-auto min-w-[220px]">
                    <div className="inline-block p-6 static bg-orange-400">Position : static</div>
                    <div className="inline-block p-6 fixed top-[99px] left-[355px] bg-pink-400">Position : fixed</div>
                    <div className="inline-block p-6 sticky top-0 bg-[#8a4baf]">Position : sticky</div>
                </div>
                <div className="inline-block min-h-[200vh] flex-1 bg-[#eee]">Long Text Area.</div>
            </div>*/}
                <div className="w-full flex">
                    {/* 이미지를 Sticky 포지션으로 고정 */}
                    <div>
                        <div className="w-[400px] sticky top-44 z-10">
                            <div className={'py-10'}>
                                <Image
                                    src="/img/index/Project.svg"
                                    alt="메인페이지 첫 번째 소개 섹션 이미지"
                                    width={456}
                                    height={457}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 텍스트 변경을 위한 섹션 */}
                    <div className={'w-full'}>
                        <section className="h-[100vh] flex flex-col justify-center items-center">
                            <div className={'w-500px my-28 grow'}>
                                <div>
                                    <h1 className="text-[50px] font-bold text-title-font-color">
                                        점심을 위한 더 나은 방법
                                    </h1>
                                    <p className="text-[27px] text-sub-font-color">
                                        AU CampusPay는 안산대학교 학생을 위한, <br />
                                        빠르고 간편한 식권 구입 시스템입니다.
                                    </p>
                                </div>
                                {/* Sub Title */}
                                <div className='mt-10 flex gap-7 items-end'>
                                    <div>
                                        <Image
                                            src={'/img/index/QR_Example.svg'}
                                            alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                                            width={163}
                                            height={163}
                                        />
                                    </div>
                                    <div>
                                        <h1 className='text-[30px] text-title-font-color font-semibold'>
                                            빠르고 쉬운 식권 인증 시스템.
                                        </h1>
                                        <p className='text-[22px] text-sub-font-color'>
                                            온라인 구매와 QR코드 인증 시스템이 합쳐진<br/>
                                            빠른 인증 시스템을 활용한 더 나은 시스템을<br/>
                                            제공합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>                {/* 두번째 섹션 */}
                        <section className="h-[100vh] flex justify-center items-center">
                            <div className="text-center">
                                {/* 다른 텍스트 내용 */}
                                <h1 className="text-[50px] font-bold text-title-font-color">
                                    두 번째 섹션 제목
                                </h1>
                                <p className="text-[27px] text-sub-font-color">
                                    여기에 두 번째 섹션의 텍스트를 작성합니다.
                                </p>
                            </div>
                        </section>

                        <section className="h-[100vh] flex justify-center items-center">
                            <div className="text-center">
                                {/* 다른 텍스트 내용 */}
                                <h1 className="text-[50px] font-bold text-title-font-color">
                                    세 번째 섹션 제목
                                </h1>
                                <p className="text-[27px] text-sub-font-color">
                                    여기에 세 번째 섹션의 텍스트를 작성합니다.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;