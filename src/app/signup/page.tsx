// app/signup/page.tsx
"use client";

import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>
      <SignupForm />
    </div>
  );
}
