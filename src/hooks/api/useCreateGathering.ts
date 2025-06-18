'use client';

import { useMutation } from '@tanstack/react-query';
import { CreateGatheringForm } from '@/types/gathering';

export function useCreateGathering(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: async (form: CreateGatheringForm) => {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('location', form.location);
      formData.append('type', form.type);
      formData.append('dateTime', form.dateTime);
      if (form.registrationEnd) {
        formData.append('registrationEnd', form.registrationEnd);
      }
      formData.append('capacity', String(form.capacity));
      if (form.image) {
        formData.append('image', form.image);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인 후 시도해주세요');
      }

      const res = await fetch('/api/gatherings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || '모임 생성 실패');
      }

      return res.json();
    },
    onSuccess,
    onError,
  });
}
