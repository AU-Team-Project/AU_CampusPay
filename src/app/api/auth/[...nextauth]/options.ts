import type { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import {connectDB} from "@/app/api/db/mongoDb";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import {ObjectId} from "bson";

export const options: NextAuthOptions = {
    providers: [
        /** ### 깃허브 외부 공급자*/
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        /** ### 사용자 지정 아이디로 로그인*/
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            /**
             * ### 사용자에게 보여질 입력 필드.
             * - credentials : 사용자가 로그인 폼에서 입력한 이메일과 비밀번호
             */
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "name"
                },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: 'pwd'
                }
            },
            /** ### 자격증명을 이용한 사용자 인증 ( MongoDb ) */
            async authorize(credentials: any): Promise<any> {
                try {
                    if (!credentials || !credentials.email || !credentials.password) {
                        throw new Error("No credentials provided");
                    }
                    /** MongoDB 접근 */
                    let db = (await connectDB).db(process.env.MONGODB_NAME);

                    /**
                     * 자격증명이 없는 경우
                     * (credentials: null || undefined 또는 객체에 email, password 속성이 없는 경우)
                     */
                    if (!credentials) throw new Error("No credentials provided");
                    let user = await db.collection(process.env.MONGODB_USER as string).findOne({
                        email: credentials.email
                    });

                    if (!user) throw new Error("User not found");
                    /** 일반 사용자(customer) 계정의 비밀번호 검증 */
                    const isPasswordValid: boolean = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) throw new Error("Invalid password");

                    /** [MS2 UserAccount] 로그인 날짜 업데이트 */
                    const lastAccess = new Date().toISOString().slice(0, 10).replace(/-/g,".");
                    await db.collection('user').updateOne({ _id: new ObjectId(user._id)}, { $set: {lastAccess}})

                    return user;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            },
        })
    ],
    /** ### 세션 설정 */
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1일 (24시간)
        updateAge: 24 * 60 * 60, // 24시간마다 세션 정보 업데이트
    },
    /** ### 콜백 : JWT */
    callbacks: {
        //5. JWT 콜백: 사용자의 역할과 ID를 토큰에 추가
        jwt: async ({token, user, account}: { token: any; user: any; account: any }) => {
            if (user) {
                token.user = {};
                token.user._id = user._id;
                token.user.username = user.username;
                token.user.email = user.email;
                token.user.password = user.password;
                token.user.phone = user.phone;
                token.user.student_number = user.student_number;
                token.user.role = user.role;
                token.user.lastAccess  = user.lastAccess;

                /* 세션 만료 시간 */
                //token.expires = new Date().getTime() + 24 * 60 * 60 * 1000;
            }
            return token;
        },
        /** ### 세션 콜백: 사용자의 ID와 역할을 세션에 추가 */
        session: async ({session, token}: { session: any; token: any }): Promise<any> => {
            if (token.user) session.user = token.user;
            return session;
        },
    },
    /** ### 경로 */
    pages: {
        signIn: '/login',
        //signOut: '/login',
    },
    /** ### 어댑터 & 시크릿키 */
    //adapter: MongoDBAdapter(connectDB),
    secret: process.env.NEXTAUTH_SECRET
}