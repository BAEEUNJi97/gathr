// 실제 서버와 통신에 사용되는 enum (절대 DALLAEMFIT 없음)
export enum GatheringType {
  OFFICE_STRETCHING = "OFFICE_STRETCHING",
  MINDFULNESS = "MINDFULNESS",
  WORKATION = "WORKATION",
}

// 프론트 그룹핑/탭 카테고리용
export type MainTab = "DALLEM" | "WORKATION";

// 탭별로 실제 API에 사용할 GatheringType들의 그룹 (여기도 DALLAEMFIT 없음)
export const MAIN_TAB_TYPE_MAP = {
  DALLEM: [
    GatheringType.OFFICE_STRETCHING,
    GatheringType.MINDFULNESS,
  ],
  WORKATION: [GatheringType.WORKATION],
} as const;

// 라벨 매핑 (enum 값만 사용)
export const GATHERING_LABEL_MAP: Record<GatheringType, string> = {
  OFFICE_STRETCHING: "오피스 스트레칭",
  MINDFULNESS: "마인드풀니스",
  WORKATION: "워케이션",
};

// -------------------
// 상태 관리/필터용 타입
export interface GatheringFilters {
  mainTab: MainTab;                  // 'DALLEM' | 'WORKATION'
  subTab: GatheringType | "";        // 서브탭: 실제 타입 or 전체("")
  location: "" | "건대입구" | "을지로3가" | "신림" | "홍대입구";
  date: string;                      // 'YYYY-MM-DD'
  sortBy: "dateTime" | "registrationEnd" | "participantCount";
  sortOrder: "asc" | "desc";
}

// -------------------
// API 호출 파라미터
export interface GatheringListApiParams {
  type?: GatheringType;
  location?: "" | "건대입구" | "을지로3가" | "신림" | "홍대입구";
  date?: string;
  sortBy?: "dateTime" | "registrationEnd" | "participantCount";
  sortOrder?: "asc" | "desc";
}

// -------------------
// 모임 생성 폼 데이터
export interface CreateGatheringForm {
  name: string;
  location: string;
  type: GatheringType;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  image: File | null;
}

// -------------------
// 서버에서 내려주는 모임 객체
export interface Gathering {
  id: number;
  teamId?: string;
  name: string;
  location: string;
  image: string;
  type: GatheringType;
  subType?: string;                 // 선택적(프론트 그룹핑 참고)
  dateTime: string;                 // ISO
  registrationEnd: string;          // ISO
  capacity: number;
  participantCount: number;
}

// -------------------
// 상세페이지 
export interface GatheringDetail {
  teamId: string;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
}
