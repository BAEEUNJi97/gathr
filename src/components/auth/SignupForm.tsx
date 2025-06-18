"use client";

import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import Image from 'next/image';
import axios from 'axios';

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
      console.log('📤 [SignupForm] signup 호출 시작');
      await signup(form.email, form.password, form.name, form.companyName);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // 에러 응답 데이터에서 parameter/message 분리
        const { parameter, message } = error.response.data as {
          parameter?: keyof ErrorState;
          message?: string;
        };

        if (parameter && message) {
          // keyof ErrorState 로 확실히 캐스팅
          const key = parameter as keyof ErrorState;
          setErrors(prev => ({
            ...prev,
            [key]: message,
          }));
        } else {
          alert(message ?? '회원가입 실패');
        }
      } else {
        alert('회원가입 실패 (알 수 없는 오류)');
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
        <h2 className="text-xl font-bold mb-6 text-center">회원가입</h2>

        {(
          [
            { label: '이름', name: 'name', type: 'text', placeholder: '이름을 입력해주세요.' },
            { label: '아이디', name: 'email', type: 'email', placeholder: '이메일을 입력해주세요.' },
            { label: '회사명', name: 'companyName', type: 'text', placeholder: '회사명을 입력해주세요.' },
            { label: '비밀번호', name: 'password', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
            { label: '비밀번호 확인', name: 'confirmPassword', type: 'password', placeholder: '비밀번호를 다시 입력해주세요.' },
          ] as const
        ).map(({ label, name, type, placeholder }) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name as keyof FormState]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`
                w-full border p-2 rounded text-sm
                ${errors[name as keyof ErrorState] ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {errors[name as keyof ErrorState] && (
              <p className="text-sm text-red-500 mt-1">
                {errors[name as keyof ErrorState]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          회원가입
        </button>

        <div className="mt-4 text-center text-sm">
          이미 회원이신가요?{' '}
          <a href="/login" className="text-orange-500 font-semibold">
            로그인
          </a>
        </div>
      </form>
    </div>
  );
}
