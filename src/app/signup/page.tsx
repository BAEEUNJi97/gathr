// app/signup/page.tsx
"use client";

import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <SignupForm />
    </div>
  );
}
