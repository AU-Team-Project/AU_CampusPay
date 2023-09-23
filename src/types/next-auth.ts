import {User} from '@/model/user';

declare module 'next-auth' {
  /** 기존 "user"타입에서 사용자 정의 "User"타입으로 변경 */
  interface Session {
    user: User;
  }
}