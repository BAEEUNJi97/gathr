"use client";

import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';
import Image from 'next/image';
import axios from 'axios';
import AlertModal from '@/components/common/AlertModal';

export default function LoginForm() {
  const { signin } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  // 리디렉션 flag: 모달에서만 페이지 이동
  const redirectAfterModal = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setModalMsg('이메일과 비밀번호를 모두 입력해주세요.');
      redirectAfterModal.current = false;
      setModalOpen(true);
      return;
    }

    try {
      await signin(form.email, form.password);
      setModalMsg('로그인 성공! 메인 페이지로 이동합니다.');
      redirectAfterModal.current = true; // ✅ 이동은 모달에서만!
      setModalOpen(true);
    } catch (err: unknown) {
      let msg = '로그인 실패 (알 수 없는 오류)';
      if (axios.isAxiosError(err) && err.response) {
        msg = err.response.data?.message || '이메일 또는 비밀번호를 다시 확인해주세요.';
      }
      setModalMsg(msg);
      redirectAfterModal.current = false;
      setModalOpen(true);
    }
  };

  // 모달 닫기 핸들러: 여기서만 router.push!
  const handleModalClose = () => {
    setModalOpen(false);
    if (redirectAfterModal.current) {
      router.push('/');
      redirectAfterModal.current = false;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-white px-4 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-2xl shadow-2xl p-0 overflow-hidden w-full max-w-[920px]">
        {/* 왼쪽: Welcome + 이미지 */}
        <div className="flex flex-col justify-center items-center py-14 px-10 flex-1 min-w-[350px] max-w-[440px]">
          <Image
            src="/login.svg"
            alt="같이달램 일러스트"
            width={320}
            height={320}
            className="mx-auto"
          />
        </div>
        {/* 오른쪽: 로그인 폼 */}
        <div className="flex flex-col justify-center items-center py-14 px-10 flex-1 min-w-[350px] max-w-[440px] border-l border-gray-100 bg-white">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[340px] flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-orange-500">로그인</h2>
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">아이디</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요"
                className="w-full border p-3 rounded-lg text-base outline-none focus:border-orange-400 transition border-gray-300"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">비밀번호</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요"
                className="w-full border p-3 rounded-lg text-base outline-none focus:border-orange-400 transition border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl text-base font-bold hover:bg-orange-600 transition mb-4"
            >
              로그인
            </button>
            <div className="mt-2 text-center text-sm">
              같이 달램이 처음이신가요?{' '}
              <a href="/signup" className="text-orange-500 font-semibold hover:underline">회원가입</a>
            </div>
          </form>
        </div>
      </div>
      {/* 알림 모달 */}
      <AlertModal
        open={modalOpen}
        onClose={handleModalClose}
        message={modalMsg}
      />
    </div>
  );
}
