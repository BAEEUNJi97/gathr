// components/gatherings/detail/GatheringDetailPage.tsx
"use client";

import React from "react";
import { GatheringDetail } from "@/types/gathering";
import JoinedCountsProgressBar from "@/components/gatherings/list/JoinedCountsProgressBar";
import { formatDate, formatTime, getTimeRemainingDaysOnly} from '@/components/common/format';
import { Heart } from "lucide-react";
import Image from "next/image";

export default function GatheringDetailPage({
  detail,
}: {
  detail: GatheringDetail;
}) {
  const {
    name,
    type,
    registrationEnd,
    dateTime,
    location,
    participantCount,
    capacity,
  } = detail;;

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* 중앙 컨테이너 */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ▶ 상단 2단 레이아웃 */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 좌측: 이미지 */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={detail.image}
              alt={detail.name}
              width={800} // 실제 사용 레이아웃에 맞춰 조정
              height={600} // 실제 사용 레이아웃에 맞춰 조정
              className="h-auto w-full"
            />
            <span>
              {getTimeRemainingDaysOnly(registrationEnd)}
            </span>
          </div>

          {/* 우측: 정보 카드 */}
          <div className="relative rounded-2xl bg-white p-8 shadow-lg">
            {/* 찜 버튼 */}
            <button className="absolute top-6 right-6">
              <Heart className="h-7 w-7 text-gray-300 transition-colors hover:text-orange-500" />
            </button>

            {/* 제목 / 타입 */}
            <h1 className="mb-1 text-2xl font-bold">{name}</h1>
            <div className="mb-4 text-sm font-semibold text-orange-600">
              {type}
            </div>

            {/* 일시 · 장소 */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex items-center px-3 py-1 bg-[#151924] text-white text-base font-semibold rounded-lg">
                {formatDate(dateTime)}
              </span>
              <span>·</span>
            <span className="inline-flex items-center px-3 py-1 bg-[#151924] text-white text-base font-semibold rounded-lg">
                {formatTime(dateTime)}
              </span>
              <span>·</span>
              <span>{location}</span>
            </div>

            {/* 참여 현황 */}
            <div>
              <div className="mb-2 flex justify-between text-xs text-gray-500">
                <span>참여 {participantCount}명</span>
                <span>정원 {capacity}명</span>
              </div>
              <JoinedCountsProgressBar
                participantCount={participantCount}
                capacity={capacity}
              />
            </div>
          </div>
        </div>

        {/* ▶ 리뷰 섹션 (전체 폭) */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">
            이용자들은 이렇게 느꼈어요!
          </h2>
          <div className="py-8 text-center text-gray-400">
            아직 리뷰가 없습니다.
          </div>
        </div>
      </div>

      {/* ▶ 하단 참여하기 버튼 (고정) */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white py-4">
        <div className="mx-auto max-w-5xl px-4">
          <button className="w-full rounded-lg bg-orange-600 py-3 font-bold text-white shadow transition hover:bg-orange-700">
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
