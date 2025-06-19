'use client';

import { useState } from 'react';
import { useCreateGathering } from '@/hooks/api/useCreateGathering';
import { GatheringType, CreateGatheringForm } from '@/types/gathering';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectionService from './SelectionService';
import { mapGatheringTypeToApi } from '@/utils/mapGatheringTypeToApi';

export default function CreateMeetingForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<CreateGatheringForm>({
    name: '',
    location: '',
    type: GatheringType.OFFICE_STRETCHING,
    dateTime: '',
    registrationEnd: '',
    capacity: 5,
    image: null,
  });

  const [meetingDate, setMeetingDate] = useState<Date | null>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const create = useCreateGathering(onSuccess, () => setError('모임 생성에 실패했습니다.'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'capacity' ? Number(value) : value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지는 5MB 이하만 가능합니다.');
      return;
    }
    setForm((prev) => ({ ...prev, image: file }));
    setFileName(file.name);
  };

  const handleTypeSelect = (type: GatheringType) => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || !meetingDate || !form.image || !form.capacity) {
      setError('모든 필수 항목을 입력해 주세요.');
      return;
    }
    if (deadlineDate && meetingDate && deadlineDate > meetingDate) {
      setError('마감일은 모임일보다 앞서야 합니다.');
      return;
    }

    // ⭐️ type 변환 부분!
    const updatedForm: CreateGatheringForm = {
      ...form,
      type: mapGatheringTypeToApi(form.type) as GatheringType,
      dateTime: meetingDate.toISOString(),
      registrationEnd: deadlineDate ? deadlineDate.toISOString() : '',
    };
  console.log('[handleSubmit] 서버로 넘길 updatedForm:', updatedForm);
    create.mutate(updatedForm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" onChange={handleChange} placeholder="모임 이름" className="input" />
      <select name="location" onChange={handleChange} className="input">
        <option value="">장소 선택</option>
        <option value="을지로3가">을지로3가</option>
        <option value="건대입구">건대입구</option>
        <option value="신림">신림</option>
        <option value="홍대입구">홍대입구</option>
      </select>

      <SelectionService selectedType={form.type} onSelect={handleTypeSelect} />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">모임 날짜</label>
          <DatePicker
            selected={meetingDate}
            onChange={(date) => setMeetingDate(date)}
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            className="input"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">모집 마감일</label>
          <DatePicker
            selected={deadlineDate}
            onChange={(date) => setDeadlineDate(date)}
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            className="input"
          />
        </div>
      </div>

      <input
        type="number"
        name="capacity"
        min={5}
        value={form.capacity}
        onChange={handleChange}
        className="input"
        placeholder="정원 (5명 이상)"
      />
      <input type="file" accept="image/*" onChange={handleImage} className="input" />
      {fileName && <p className="text-sm text-gray-600">파일: {fileName}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" className="btn-orange">
        모임 생성하기
      </button>
    </form>
  );
}
