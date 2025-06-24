'use client';

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axiosInstance';

// AuthContext 타입 정의
type AuthContextType = {
  token: string | null;
  loginModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  signup: (
    email: string,
    password: string,
    name: string,
    companyName: string
  ) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  userName: string;
  userId: number;
  isLoading: boolean;
  isClient: boolean;
};

// 기본값 설정
export const AuthContext = createContext<AuthContextType>({
  token: null,
  loginModalOpen: false,
  setLoginModalOpen: () => {},
  setToken: () => {},
  signup: async () => {},
  signin: async () => {},
  signout: async () => {},
  userName: '',
  userId: 0,
  isLoading: true,
  isClient: false,
});

// AuthProvider 컴포넌트
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  );
  const [userName, setUserName] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem('user_name') ?? '' : '')
  );
  const [userId, setUserId] = useState(
    () => (typeof window !== 'undefined' ? Number(localStorage.getItem('user_id') ?? 0) : 0)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [previousPath, setPreviousPath] = useState('/');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // 클라이언트 렌더링 플래그
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 초기 토큰/유저 정보 로드
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('user_name');
    const storedUserId = localStorage.getItem('user_id');

    if (storedToken) setToken(storedToken);
    if (storedUserName) setUserName(storedUserName);
    if (storedUserId) setUserId(Number(storedUserId));
    setIsLoading(false);
  }, []);

  /** 로그인 */
  const signin = async (email: string, password: string) => {
    try {
      const res = await instance.post('/auths/signin', { email, password });
      if (res.status === 200 && res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        await fetchUser();
        router.replace(previousPath);
      }
    } catch (err) {
      throw err;
    }
  };

  /** 회원가입 */
  const signup = async (
    email: string,
    password: string,
    name: string,
    companyName: string
  ) => {
    try {
      const res = await instance.post('/auths/signup', {
        email,
        password,
        name,
        companyName,
      });
      if (res.status === 200) {
        router.replace('/login');
      }
    } catch (err) {
      throw err;
    }
  };

  /** 사용자 정보 조회 */
  const fetchUser = async () => {
    try {
      const res = await instance.get('/auths/user');
      if (res.status !== 200 || !res.data) throw new Error('사용자 정보 없음');
      const user = res.data;
      localStorage.setItem('user_id', String(user.id));
      localStorage.setItem('user_name', user.name);
      localStorage.setItem('user_email', user.email);
      localStorage.setItem('user_company_name', user.companyName);
      localStorage.setItem('user_image', user.image);
      setUserName(user.name);
      setUserId(user.id);
    } catch (err) {
      console.error('❌ fetchUser 실패:', err);
      throw err;
    }
  };

  /** 로그아웃 */
  const signout = async () => {
    try {
      await instance.post('/auths/signout');
      localStorage.clear();
      setToken(null);
      setUserName('');
      setUserId(0);
      queryClient.invalidateQueries({ queryKey: ['checkGatheringJoined'] });
      router.replace('/login');
    } catch (err) {
      console.error('❌ 로그아웃 실패:', err);
    }
  };

  // 경로 기반 인증/리디렉션
  useEffect(() => {
    if (isLoading) return;
    if (!token && pathname.startsWith('/mypage')) {
      alert('로그인이 필요합니다.');
      router.replace('/login');
    }
    if (pathname !== '/login' && !pathname.includes('/auth/')) {
      setPreviousPath(pathname);
    }
    if (token && pathname === '/login') {
      router.replace(previousPath);
    }
  }, [isLoading, token, pathname, previousPath, router]);

  return (
    <AuthContext.Provider
      value={{
        token,
        loginModalOpen,
        setLoginModalOpen,
        setToken,
        signup,
        signin,
        signout,
        userName,
        userId,
        isLoading,
        isClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
