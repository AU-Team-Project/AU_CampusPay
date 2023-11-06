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
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY || document.documentElement.scrollTop);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    console.log(scroll)

    // 이미지 수평 이동 계산 함수
    const calculateTranslateX = () => {
        // 최대 스크롤 거리
        const maxScrollDistance = 600;
        // 이미지가 이동할 최대 거리 (픽셀)
        const maxTranslateX = 500;

        if (scroll < maxScrollDistance) {
            // 스크롤 위치에 따라 이동 거리 계산
            return (scroll / maxScrollDistance) * maxTranslateX - maxTranslateX;
        } else {
            return 0; // 최대 이동 거리에 도달하면 더 이상 이동하지 않음
        }
    };

    // 이미지 투명도 계산 함수
    const calculateOpacity = () => {
        // 스크롤이 300px보다 작으면 이미지 안보임
        if (scroll < 300) {
            return 0;
            // 스크롤이 300px, 600px 사이일때 이미지 투명도 증가
        } else if (scroll >= 650 && scroll <= 800) {
            return (scroll - 600) / 600;
            // 스크롤이 600px 넘으면 이미지 완전히 렌더링
        } else {
            return 1;
        }
    }

    return (
        <div className='flex flex-col'>
            {/* 인덱스 페이지 섹션 1 */}
            <section className='h-screen flex justify-center items-center gap-5 bg-section1-color'>
                <div className='relative'>
                    <Image
                        src={'/img/index/Project.svg'}
                        alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                        width={456}
                        height={457}
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
                    <div className='mt-10 flex gap-7'>
                        <div>
                            <Image
                                src={'/img/index/QR_Example.svg'}
                                alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                                width={163}
                                height={163}
                            />
                        </div>
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
            </section>
            {/* 인덱스 페이지 섹션 2*/}
            <section className='h-[100vh] flex justify-center items-center gap-20 bg-section2-color'>
                <div
                    className={`${scroll > 470 ? 'duration-1500' : 'duration-1000'}`}
                    style={{
                        opacity: calculateOpacity(),
                        transform: `translateX${calculateTranslateX()}px`
                    }}
                >
                    <Image
                        src={'/img/index/Iphone.svg'}
                        alt={'메인페이지 두 번째 소개 섹션 이미지'}
                        width={330}
                        height={381}
                    />
                </div>
                <div>
                    <div>
                        <h1 className={`animate font-bold ${scroll > 620 ? 'setSectionTitle' : 'sectionTitle'}`}>
                            앉은 자리에서 간편하게 구매.
                        </h1>
                        <p className={`text-[27px] ${scroll > 700 ? 'sectionScroll' : 'setSectionScroll'}`}>
                            핸드폰과 노트북만으로 카카오페이를 이용해,<br/>
                            그 자리에서 간편하게 식권을 구매할 수 있습니다.
                        </p>
                    </div>
                    <Link
                        href={`/payment/${session?.user?.username}`}
                        className={`${scroll > 835 ? 'transition duration-[3s] opacity-100' : 'transition duration-[1s] opacity-0'}`}
                    >
                        <div
                            className={`w-[720px] h-[80px] mt-28 text-[35px] flex justify-center items-center font-medium bg-footer-color rounded-[10px]`}>
                            <span>식권 구매하기</span>
                        </div>
                    </Link>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 3*/}
            <section className='h-screen flex justify-center gap-20 items-center bg-section3-color relative'>
                <div>
                    <Image
                        className={`absolute left-48 ${scroll > 1650 ? 'top-[100px] duration-1500' : 'top-[800px] duration-3000'}`}
                        src={'/img/index/Scanner.svg'}
                        alt={'메인페이지 스캐너 섹션 이미지'}
                        width={560}
                        height={684}
                    />
                </div>
                <div>
                    <h1 className={`mb-5 font-bold text-[50px] absolute top-80 right-0 ${scroll > 1650 ? 'right-96 duration-1500' : 'right-0 duration-1200'}`}>
                        배치된 스캐너를
                    </h1>
                    <h1 className={`mb-5 font-bold text-[50px] absolute top-[24rem] right-0 ${scroll > 1700 ? 'right-[300px] duration-1500' : 'right-0 duration-1200'}`}>
                        이용한 간편 인증.
                    </h1>
                    <p className={`text-[27px] absolute right-[300px] ${scroll > 1730 ? 'top-[30rem] duration-1200' : 'top-[1000px] duration-1500'}`}>
                        카페테리아에 비치된 스캐너에, QR 식권을
                    </p>
                    <p className={`text-[27px] absolute right-[300px] ${scroll > 1880 ? 'top-[34rem] duration-1200' : 'top-[1000px] duration-1500'}`}>
                        스캐너에 비추는 것 만으로, 끝나는 빠르고
                    </p>
                    <p className={`text-[27px] absolute top-[38rem] right-[430px] ${scroll > 1970 ? 'right-[21rem] duration-1200' : 'top-[1000px] duration-1500'}`}>
                        간편한 인증을 할 수 있습니다.
                    </p>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 4*/}
            <section className='h-screen bg-section4-color flex justify-center items-center gap-20'>
                <div>
                    <Image
                        src={'/img/index/Calendar.svg'}
                        alt={'메인페이지 식단표 섹션 이미지'}
                        width={650}
                        height={300}
                    />
                </div>
                <div>
                    <div>
                        <h1 className='text-[50px] font-semibold'>
                            보기 쉬운 식단표
                        </h1>
                        <p className='text-[27px]'>
                            식당 별로 매 주 단위로 정리된 식단표를 통해,
                        </p>
                        <p className='text-[27px]'>
                            빠르고 직관적으로 식단을 파악할 수 있습니다.
                        </p>
                    </div>
                    <button
                        className='w-[300px] h-[80px] text-[35px] mt-10 font-medium bg-footer-color rounded-[10px]'
                        onClick={() => alert('준비중 입니다.')}
                    >
                        식단표 보러가기
                    </button>
                </div>
            </section>
            {/* 인덱스 페이지 섹션 5*/}
            <section className='h-screen flex justify-center items-center gap-5 bg-section5-color'>
                <div>
                    <Image
                        src={'/img/index/Chatbot.svg'}
                        alt={'메인페이지 챗봇 섹션 이미지'}
                        width={543}
                        height={515}
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
                    <button
                        className='w-[335px] h-[80px] mt-20 bg-footer-color font-medium text-[35px] rounded-[10px]'
                        onClick={() => alert('준비중 입니다.')}
                    >
                        챗봇 추가하기
                    </button>
                </div>
            </section>
        </div>
    );
};

export default MainPageSection;