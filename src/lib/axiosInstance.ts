// lib/axiosInstance.ts
import axios from "axios";

export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${TEAM_ID}`,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    console.log("📤 [Axios 요청]", config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("📥 [Axios 응답]", res.status, res.data); // 서버 응답 상태와 데이터를 확인
    return res;
  },
  (err) => {
    console.error("❌ [Axios 에러 응답]", err?.response?.status, err?.response?.data); // 에러 로그 출력
    if (err?.response?.data?.message) {
      console.error('서버에서 반환한 오류 메시지:', err?.response?.data?.message); // 서버에서 반환한 오류 메시지 출력
    }
    return Promise.reject(err);
  }
);

export default instance;
