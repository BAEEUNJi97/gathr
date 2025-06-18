// src/app/login/page.tsx
"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <LoginForm />
    </div>
  );
}
