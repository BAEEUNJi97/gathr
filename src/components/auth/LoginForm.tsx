"use client";

import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import Image from 'next/image';
import axios from 'axios'

export default function LoginForm() {
  const { signin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      await signin(form.email, form.password);
    } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      setError(err.response.data?.message ?? '로그인 실패');
    } else {
      setError('로그인 실패 (알 수 없는 오류)');
    }
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center px-4 py-10">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/login.svg"
          alt="같이달램 일러스트"
          width={300}
          height={300}
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center">로그인</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">아이디</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className={`w-full border p-2 rounded text-sm ${error.includes('이메일') ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            className={`w-full border p-2 rounded text-sm ${error.includes('비밀번호') ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          로그인
        </button>

        <div className="mt-4 text-center text-sm">
          같이 달램이 처음이신가요?{' '}
          <a href="/signup" className="text-orange-500 font-semibold">회원가입</a>
        </div>
      </form>
    </div>
  );
}
