import axios , { TEAM_ID } from "@/lib/axiosInstance";

export const signup = async (
  email: string,
  password: string,
  name: string,
  companyName: string
) => {
  const res = await axios.post(`/${TEAM_ID}/auths/signup`, {
    email,
    password,
    name,
    companyName,
  });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`/${TEAM_ID}/auths/signin`, {
    email,
    password,
  });
  return res.data;
};
