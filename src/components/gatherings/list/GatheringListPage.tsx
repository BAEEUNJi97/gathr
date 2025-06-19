"use client";

import { useState } from "react";
import FilterHeader from "./FilterHeader";
import GatheringsList from "./GatheringsList";
import CreateMeetingModal from "../create/CreateMeetingModal";

export default function GatheringListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* 필터 헤더 (openModal만 prop으로) */}
      <FilterHeader />
      {/* 실제 리스트는 context 필터로 필터링 */}
      <GatheringsList />
      <CreateMeetingModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}
