// src/lib/axiosInstance.ts

import axios from "axios";

export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID!;

// 외부 API가 설정되어 있으면 그걸 쓰고, 아니면 내부 API 라우트로 fallback
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${TEAM_ID}`
  : `/api/${TEAM_ID}`;

const instance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log("📤 [Axios 요청]", config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => {
    console.log("📥 [Axios 응답]", res.status, res.data);
    return res;
  },
  (err: unknown) => {
    // AxiosError 타입인지 체크
    if (axios.isAxiosError(err)) {
      console.error("❌ [Axios 에러 응답]", err.response?.status, err.response?.data);
      if (err.response?.data && (err.response.data as any).message) {
        console.error("서버에서 반환한 오류 메시지:", (err.response.data as any).message);
      }
    } else {
      console.error("❌ [알 수 없는 에러]", err);
    }
    return Promise.reject(err);
  }
);

export default instance;
