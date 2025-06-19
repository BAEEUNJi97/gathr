'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';

import CreateMeetingModal from '@/components/gatherings/create/CreateMeetingModal';


function AlertModal({ open, onClose, message }: { open: boolean; onClose: () => void; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl p-6 min-w-[220px] shadow-lg text-center">
        <div className="mb-5 text-base text-gray-900">{message}</div>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white rounded-lg px-6 py-2 hover:bg-orange-600 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default function CreateMeetingButtonWithModal() {
  const { token } = useContext(AuthContext);
  const isLoggedIn = !!token;
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) setModalOpen(true);
    else setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    router.push('/login');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-bold transition"
      >
        모임 만들기
      </button>
      <CreateMeetingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <AlertModal
        open={alertOpen}
        onClose={handleAlertClose}
        message="로그인이 필요합니다! 로그인 페이지로 이동합니다."
      />
    </>
  );
}
