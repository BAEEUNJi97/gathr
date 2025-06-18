import axios from '@/lib/axiosInstance';

import { CreateGatheringForm } from '@/types/gathering';

export async function createGathering(data: CreateGatheringForm, teamId = 'team-mochi-dev') {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('location', data.location);
  formData.append('type', data.type);
  formData.append('dateTime', data.dateTime);
  formData.append('registrationEnd', data.registrationEnd);
  formData.append('capacity', String(data.capacity));
  if (data.image) formData.append('image', data.image);

  return axios.post(`/${teamId}/gatherings`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}