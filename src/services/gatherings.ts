import  { TEAM_ID } from "@/lib/axiosInstance";
import axios from "axios";
import { CreateGatheringForm } from '@/types/gathering';
import { mapGatheringTypeToApi } from "@/utils/mapGatheringTypeToApi";

export async function createGathering(data: CreateGatheringForm) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('location', data.location.trim());
  formData.append('type', mapGatheringTypeToApi(data.type));
  formData.append('dateTime', data.dateTime);
  formData.append('registrationEnd', data.registrationEnd);
  formData.append('capacity', String(Math.max(Number(data.capacity), 5)));
  if (data.image) formData.append('image', data.image);


   for (const [k, v] of formData.entries()) {
    console.log('FormData entry:', k, v);
  }
  
  return axios.post(`/${TEAM_ID}/gatherings`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

