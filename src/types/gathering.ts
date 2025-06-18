// src/types/gathering.ts

/**
 * 가능한 서비스 종류 (백엔드 스펙과 일치)
 */
export enum GatheringType {
  DALLAEM_FIT = 'DALLAEM_FIT',
  OFFICE_STRETCHING = 'OFFICE_STRETCHING',
  MINDFULNESS = 'MINDFULNESS',
  WORKATION = 'WORKATION',
}

/**
 * 모임 생성 폼 데이터
 */
export interface CreateGatheringForm {
  name: string;
  location: string;
  type: GatheringType;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  image: File | null;
}

/**
 * 서버에서 내려주는 모임 객체
 */
export interface Gathering {
  id: number;
  teamId?: string;
  name: string;
  location: string;
  image: string;
  type: GatheringType;
  /** 선택적 서브 타입 (예: OFFICE_STRETCHING 내 세부 분류) */
  subType?: string;
  dateTime: string;           // 모임 시작 날짜와 시간
  registrationEnd: string;    // 모집 마감 시간
  capacity: number;
  participantCount: number;
}

/**
 * 모임 목록 필터링 조건
 */
export interface GatheringFilters {
  type: GatheringType;
  location: '' |'건대입구' | '을지로3가' | '신림' | '홍대입구';
  date: string;
  sortBy: 'dateTime' | 'registrationEnd' | 'participantCount';
  subType?: string;
}
