'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthProvider';

import CreateMeetingModal from '@/components/gatherings/create/CreateMeetingModal';
import AlertModal from '@/components/common/AlertModal';



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
