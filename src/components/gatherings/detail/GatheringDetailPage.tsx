"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import JoinedCountsProgressBar from "@/components/gatherings/list/JoinedCountsProgressBar";
import { formatDate, formatTime, getTimeRemainingDaysOnly } from "@/components/common/format";

// mock 데이터(리뷰)
const mockReviews = [
  {
    id: 1,
    nickname: "협원조율",
    date: "2024.01.25",
    rating: 5,
    content: "따뜻하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    nickname: "동글동글이",
    date: "2024.01.25",
    rating: 4,
    content: "두번째 이용이에요! 만족합니다.",
    avatar: "/avatar2.png",
  },
  {
    id: 3,
    nickname: "모닝러너",
    date: "2024.01.25",
    rating: 4,
    content: "강사분도 친절하시고~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요~ ^^",
    avatar: "/avatar3.png",
  },
  {
    id: 4,
    nickname: "해보자고",
    date: "2024.01.25",
    rating: 3,
    content: "수업이 단조로워요.",
    avatar: "/avatar4.png",
  },
];

// mock 참여자 데이터 (프로필 최대 5명, 그 이상은 +N)
const participants = [
  { id: 1, name: "홍길동", img: "/avatar1.png" },
  { id: 2, name: "김길동", img: "/avatar2.png" },
  { id: 3, name: "박길동", img: "/avatar3.png" },
  { id: 4, name: "최길동", img: "/avatar4.png" },
  { id: 5, name: "이길동", img: "/avatar5.png" },
  // 그 이상은 +N 표기
];

export default function GatheringDetailPage({
  detail,
}: {
  detail: {
    name: string;
    type: string;
    registrationEnd: string;
    dateTime: string;
    location: string;
    participantCount: number;
    capacity: number;
    image: string;
    // ...필요 시 기타 필드
  };
}) {
  const {
    name,
    registrationEnd,
    dateTime,
    location,
    participantCount,
    capacity,
    image,
  } = detail;

  // +N 처리
  const maxAvatars = 5;
  const extraCount = participantCount - maxAvatars;

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* 상단 2단 레이아웃 */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 왼쪽: 이미지/마감뱃지 */}
          <div className="relative rounded-2xl shadow-lg overflow-hidden aspect-[4/3] min-h-[280px] bg-gray-100">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* 마감뱃지 */}
            <span className="absolute left-4 top-4 z-10 rounded-lg bg-orange-500/90 px-3 py-1 text-xs font-bold text-white shadow">
              {getTimeRemainingDaysOnly(registrationEnd)}
            </span>
          </div>

          {/* 오른쪽: 정보 카드 */}
          <div className="relative rounded-2xl bg-white p-8 shadow-lg flex flex-col h-full border border-[#f1f1f1]">
            {/* 찜(하트) 버튼 */}
            <button className="absolute top-6 right-6 group">
              <Heart className="h-7 w-7 text-gray-300 group-hover:text-orange-500 transition-colors" />
            </button>
            {/* 제목/타입 */}
            <h1 className="mb-1 text-2xl font-bold break-keep">{name}</h1>
            <div className="mb-2 text-base font-medium text-gray-500">{location}</div>

            {/* 날짜/시간 */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center px-3 py-1 bg-[#151924] text-white font-semibold rounded-lg">
                {formatDate(dateTime)}
              </span>
              <span>·</span>
              <span className="inline-flex items-center px-3 py-1 bg-[#151924] text-white font-semibold rounded-lg">
                {formatTime(dateTime)}
              </span>
            </div>

            {/* 모집 현황 (참여자 + 진행바 + 뱃지) */}
            <div className="mt-1 mb-2 flex items-center gap-2">
              <div className="flex -space-x-2">
                {participants.slice(0, maxAvatars).map((p) => (
                  <Image
                    key={p.id}
                    src={p.img}
                    alt={p.name}
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
                {extraCount > 0 && (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-xs text-gray-600 font-bold border-2 border-white">
                    +{extraCount}
                  </span>
                )}
              </div>
              <span className="ml-2 text-sm text-gray-500 font-bold">
                모집 정원 {participantCount}명
              </span>
              <span className="ml-auto inline-flex items-center text-xs font-bold text-orange-600 bg-orange-50 rounded-full px-2 py-1">
                {/* 조건: 확정시 '개설확정', 미달시 '모집중' */}
                {participantCount >= 5 ? "개설확정" : "모집중"}
              </span>
            </div>
            {/* 프로그레스바 */}
            <JoinedCountsProgressBar participantCount={participantCount} capacity={capacity} />

            {/* 최소/최대 인원 */}
            <div className="flex justify-between mt-1 text-xs text-gray-400 font-semibold">
              <span>최소인원 5명</span>
              <span>최대인원 {capacity}명</span>
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
          {mockReviews.length > 0 ? (
            <ul>
              {mockReviews.map((r) => (
                <li key={r.id} className="mb-6 pb-6 border-b border-dotted border-gray-200 last:border-none last:mb-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* 하트 평점 */}
                    <span>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Heart
                          key={i}
                          className="inline h-4 w-4 text-orange-400"
                          fill="orange"
                        />
                      ))}
                      {Array.from({ length: 5 - r.rating }).map((_, i) => (
                        <Heart
                          key={i}
                          className="inline h-4 w-4 text-gray-200"
                          fill="white"
                        />
                      ))}
                    </span>
                  </div>
                  <div className="text-base text-gray-700 break-keep mb-1">{r.content}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <Image src={r.avatar} alt={r.nickname} width={20} height={20} className="rounded-full bg-gray-200" />
                    <span className="font-semibold text-gray-600 ml-1">{r.nickname}</span>
                    <span className="mx-1">|</span>
                    <span>{r.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-gray-400">아직 리뷰가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white py-4">
        <div className="mx-auto max-w-5xl px-4 flex justify-end gap-3">
          <button className="rounded-lg border border-orange-600 px-6 py-2 font-bold text-orange-600 bg-white shadow hover:bg-orange-50 transition">
            취소하기
          </button>
          <button className="rounded-lg bg-orange-600 px-6 py-2 font-bold text-white shadow hover:bg-orange-700 transition">
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
