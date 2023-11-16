// 'use client'
// import React, {useState} from 'react';
// import Link from "next/link";
// import Image from 'next/image'
//
// import {signIn, signOut, useSession} from "next-auth/react";
// import Button from "@/components/ui/Button/Button";
// import {User} from "@/model/user";
// import {GiHamburgerMenu} from "react-icons/gi";
// import {IoClose} from "react-icons/io5";
//
// type CustomSession = {
//     user: User;
// }
//
// const DesktopNavbar = () => {
//     const {data: session} = useSession();
//     const userRole = session?.user?.role;
//
//     const NavbarRoute = [
//         {
//             id: 1,
//             label: '식단표',
//             href: `/menu/student?page=1`,
//         },
//         {
//             id: 2,
//             label: '이용방법',
//             href: `/guide`,
//         },
//         {
//             id: 3,
//             label: '공지사항',
//             href: `/notice/lists?page=1`,
//         },
//         {
//             id: 4,
//             label: '문의하기',
//             href: `/`,
//         },
//         {
//             id: 5,
//             label: '식권구입',
//             href: `/payment/${session?.user?.username}`,
//         }
//     ];
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//
//     // 햄버거 메뉴 클릭 핸들러
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     }
//     console.log(isMenuOpen);
//
//     const getLinkItem = (session: CustomSession | null) => {
//         switch (userRole) {
//             case 'admin':
//                 return (
//                     <>
//                         <li className='flex items-center text-primary-color'>
//                             <Link href='/admin'>
//                                 관리자 페이지
//                             </Link>
//                         </li>
//                         <li className='flex items-center text-primary-color'>
//                             <Button
//                                 text={'로그아웃'}
//                                 onClick={() => signOut()}
//                             />
//                         </li>
//                     </>
//                 )
//             case 'customer':
//                 return (
//                     <>
//                         <li className='text-primary-color'>
//                             <Link href={`/users/accounts/${session?.user?.student_number}`}>
//                                 마이 페이지
//                             </Link>
//                         </li>
//                         <li className='text-primary-color'>
//                             <Button
//                                 text={'로그아웃'}
//                                 onClick={() => signOut()}
//                             />
//                         </li>
//                     </>
//                 )
//             default:
//                 return !session ? (
//                     <>
//                         <li className='flex items-center text-black-color font-bold'>
//                             <Link href='/register'>회원가입</Link>
//                         </li>
//                         <li className='py-1 px-4 text-primary-color text-xl border-solid border-primary-color border-4 rounded-3xl hover:bg-primary-color hover:text-white hover:duration-300'>
//                             <Button
//                                 text={'로그인'}
//                                 onClick={() => signIn()}
//                             />
//                         </li>
//                     </>
//                 ) : null;
//         }
//     }
//
//     return (
//         <header
//             className='
//                 min-w-[320px]
//                 flex-col
//                 lg:shadow-lg
//                 lg:shadow-gray-50
//             '
//         >
//             <div
//                 className='
//                     h-[65px]
//                     text-[17px]
//                     flex
//                     items-center
//                     justify-between
//                     px-5
//                 '
//             >
//                 {/* Global Navigation Menu (Responsive) */}
//                 <nav
//                     className='
//                         w-full
//                         h-full
//                         lg:flex
//                         lg:justify-between
//                         lg:items-center
//                     '
//                 >
//                     <div
//                         className='
//                             my-5
//                             flex
//                             justify-between
//                         '
//                     >
//                         <Link href='/'>
//                             <Image
//                                 src='/Logo.svg'
//                                 alt='웹페이지 로고'
//                                 width={93}
//                                 height={13}
//                             />
//                         </Link>
//                         <button
//                             className='block lg:hidden'
//                             onClick={toggleMenu}
//                         >
//                             {isMenuOpen ?
//                                 <IoClose className='w-9 h-9'/> :
//                                 <GiHamburgerMenu className='w-9 h-9'/>
//                             }
//                         </button>
//                     </div>
//                     <ul
//                         className={`
//                             mt-3
//                             font-semibold
//                             flex
//                             flex-col
//                             items-centers
//                             justify-center
//                             gap-12
//                             text-black-color
//                             sm:mx-5
//                             sm:bg-white
//                             sm:z-[100]
//                             lg:flex-row
//                             ${isMenuOpen ? 'xsm:flex' : 'xsm:hidden'} lg:flex
//                         `}
//                     >
//                         {NavbarRoute.map((item => (
//                             <li
//                                 key={item.id}
//                                 className='
//                                     flex
//                                     items-center
//                                     sm:w-100px
//                                     sm:justify-center
//                                     lg:flex
//                                 '
//                             >
//                                 <Link href={item.href}>
//                                     {item.label}
//                                 </Link>
//                             </li>
//                         )))}
//                         <>{getLinkItem(session)}</>
//                     </ul>
//
//                 </nav>
//             </div>
//         </header>
//     );
// };
//
// export default DesktopNavbar;