'use client';

import { useEffect, useState } from 'react';
import FilterHeader from './FilterHeader';
import GatheringsList from './GatheringsList'; // 모임 목록
import CreateMeetingModal from '../create/CreateMeetingModal';
import { useFilters } from '@/contexts/FilterContext'; // 필터 상태 사용

export default function GatheringListPage() {
  const { filters, setFilters } = useFilters(); // useFilters 훅을 통해 전역 필터 상태 가져오기
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 필터 설정 컴포넌트 */}
      <FilterHeader filters={filters} setFilters={setFilters} openModal={openModal} />
      {/* 필터링된 목록 */}
      <GatheringsList fetchFromApi={true} filters={filters} />
      <CreateMeetingModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}
