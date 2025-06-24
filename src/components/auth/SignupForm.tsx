"use client";

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';
import Image from 'next/image';
import axios from 'axios';
import AlertModal from '@/components/common/AlertModal';

type FormState = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
};

type ErrorState = {
  [K in keyof FormState]: string;
};

export default function SignupForm() {
  const { signup } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({
    name: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });

  // 모달 상태
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [failMsg, setFailMsg] = useState('');

  const validate = () => {
    const newErrors: ErrorState = { ...errors };
    let valid = true;

    if (!form.name) {
      newErrors.name = "이름을 입력해주세요.";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!form.email) {
      newErrors.email = "이메일을 입력해주세요.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!form.companyName) {
      newErrors.companyName = "회사명을 입력해주세요.";
      valid = false;
    } else {
      newErrors.companyName = "";
    }

    if (!form.password || form.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signup(form.email, form.password, form.name, form.companyName);
      setSuccessModalOpen(true); // 성공 시 성공 모달
    } catch (error: unknown) {
      let msg = '회원가입 실패 (알 수 없는 오류)';
      if (axios.isAxiosError(error) && error.response) {
        const { parameter, message } = error.response.data as {
          parameter?: keyof ErrorState;
          message?: string;
        };
        if (parameter && message) {
          const key = parameter as keyof ErrorState;
          setErrors(prev => ({ ...prev, [key]: message }));
          msg = message;
        } else if (message) {
          msg = message;
        } else {
          msg = '입력값이 올바른지 다시 확인해주세요.';
        }
      }
      setFailMsg(msg);
      setFailModalOpen(true);
    }
  };

  // 모달 닫기 핸들러
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    router.push("/login"); 
  };
  const handleFailModalClose = () => setFailModalOpen(false);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white px-4 mt-16">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-0 overflow-hidden w-full max-w-[860px]">
        {/* 일러스트 영역 */}
        <div className="flex justify-center items-center py-12 px-10 flex-1 min-w-[330px] max-w-[420px] bg-white">
          <Image
            src="/login.svg"
            alt="같이달램 일러스트"
            width={320}
            height={320}
            priority
            className="mx-auto"
          />
        </div>
        {/* 회원가입 폼 */}
        <div className="flex flex-col justify-center items-center py-12 px-10 flex-1 min-w-[330px] max-w-[420px] border-l border-gray-100">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[340px] flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-orange-500">회원가입</h2>
            {(
              [
                { label: '이름', name: 'name', type: 'text', placeholder: '이름을 입력해주세요.' },
                { label: '아이디', name: 'email', type: 'email', placeholder: '이메일을 입력해주세요.' },
                { label: '회사명', name: 'companyName', type: 'text', placeholder: '회사명을 입력해주세요.' },
                { label: '비밀번호', name: 'password', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
                { label: '비밀번호 확인', name: 'confirmPassword', type: 'password', placeholder: '비밀번호를 다시 입력해주세요.' },
              ] as const
            ).map(({ label, name, type, placeholder }) => (
              <div key={name} className="mb-5">
                <label className="block mb-2 text-base font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name as keyof FormState]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`
                    w-full border p-3 rounded-lg text-base
                    ${errors[name as keyof ErrorState] ? 'border-red-500' : 'border-gray-300'}
                    outline-none focus:border-orange-400 transition
                  `}
                />
                {errors[name as keyof ErrorState] && (
                  <p className="text-base text-red-500 mt-1">
                    {errors[name as keyof ErrorState]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl text-base font-bold hover:bg-orange-600 transition mb-4"
            >
              회원가입
            </button>
            <div className="mt-2 text-center text-sm">
              이미 회원이신가요?{' '}
              <a href="/login" className="text-orange-500 font-semibold hover:underline">
                로그인
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* 모달 구간 */}
      <AlertModal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        message="회원가입이 완료되었습니다! 로그인 페이지로 이동합니다."
      />
      <AlertModal
        open={failModalOpen}
        onClose={handleFailModalClose}
        message={failMsg}
      />
    </div>
  );
}
