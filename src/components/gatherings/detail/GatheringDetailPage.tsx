// components/gatherings/detail/GatheringDetailPage.tsx
'use client';

import React from 'react';
import { GatheringDetail } from '@/types/gathering';
import JoinedCountsProgressBar from '@/components/gatherings/list/JoinedCountsProgressBar';
import { Heart } from 'lucide-react';
import Image from 'next/image';


export default function GatheringDetailPage({ detail }:{  detail: GatheringDetail}) {
  const {
    name,
    type,
    dateTime,
    registrationEnd,
    location,
    participantCount,
    capacity,
  } = detail;

  // 포맷
  const d = new Date(dateTime);
  const dateStr = `${d.getMonth() + 1}월 ${d.getDate()}일`;
  const timeStr = d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      {/* 중앙 컨테이너 */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ▶ 상단 2단 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 좌측: 이미지 */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
                src={detail.image}
                    alt={detail.name}
                    width={800}      // 실제 사용 레이아웃에 맞춰 조정
                    height={600}     // 실제 사용 레이아웃에 맞춰 조정
                    className="w-full h-auto"
                />
            <span className="absolute top-4 right-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-full">
              마감 {new Date(registrationEnd).toLocaleTimeString('ko-KR', { hour: '2-digit', hour12: false })}시
            </span>
          </div>

          {/* 우측: 정보 카드 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            {/* 찜 버튼 */}
            <button className="absolute top-6 right-6">
              <Heart className="w-7 h-7 text-gray-300 hover:text-orange-500 transition-colors" />
            </button>

            {/* 제목 / 타입 */}
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <div className="text-sm text-orange-600 font-semibold mb-4">
              {type}
            </div>

            {/* 일시 · 장소 */}
            <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm mb-6">
              <span>{dateStr}</span>
              <span>·</span>
              <span>{timeStr}</span>
              <span>·</span>
              <span>{location}</span>
            </div>

            {/* 참여 현황 */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
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
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            이용자들은 이렇게 느꼈어요!
          </h2>
          <div className="text-gray-400 text-center py-8">
            아직 리뷰가 없습니다.
          </div>
        </div>
      </div>

      {/* ▶ 하단 참여하기 버튼 (고정) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4 z-50">
        <div className="max-w-5xl mx-auto px-4">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-bold shadow transition">
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
