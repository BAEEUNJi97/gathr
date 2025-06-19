'use client';

import { useState } from 'react';
import { GatheringType, CreateGatheringForm } from '@/types/gathering';
import { useCreateGathering } from '@/hooks/api/useCreateGathering';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectionService from './SelectionService';
import { mapGatheringTypeToApi } from '@/utils/mapGatheringTypeToApi';

// 1. 선택된 서비스 텍스트 매핑
const SERVICE_TYPE_LABEL_MAP: Record<GatheringType, string> = {
  OFFICE_STRETCHING: "달램핏 오피스 스트레칭",
  MINDFULNESS: "달램핏 마인드풀니스",
  WORKATION: "워케이션"
};

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
    setError('');
    if (!form.name || !form.location || !meetingDate || !form.image || !form.capacity) {
      setError('모든 필수 항목을 입력해 주세요.');
      return;
    }
    if (deadlineDate && meetingDate && deadlineDate > meetingDate) {
      setError('마감일은 모임일보다 앞서야 합니다.');
      return;
    }

    const updatedForm: CreateGatheringForm = {
      ...form,
      type: mapGatheringTypeToApi(form.type) as GatheringType,
      dateTime: meetingDate.toISOString(),
      registrationEnd: deadlineDate ? deadlineDate.toISOString() : '',
    };
    create.mutate(updatedForm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 pt-2 pb-4">
      {/* 모임 이름 */}
      <div>
        <label className="block mb-1 text-sm text-gray-600">모임 이름</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="모임 이름을 작성해주세요"
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* 장소 */}
      <div>
        <label className="block mb-1 text-sm text-gray-600">장소</label>
        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-orange-500 appearance-none"
        >
          <option value="">장소를 선택해주세요</option>
          <option value="을지로3가">을지로3가</option>
          <option value="건대입구">건대입구</option>
          <option value="신림">신림</option>
          <option value="홍대입구">홍대입구</option>
        </select>
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block mb-1 text-sm text-gray-600">이미지</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-l-lg px-4 py-3 bg-gray-50"
            placeholder="이미지를 첨부해주세요"
            value={fileName}
            readOnly
          />
          <label className="inline-block cursor-pointer border border-orange-500 text-orange-500 font-semibold px-4 py-3 rounded-r-lg bg-white hover:bg-orange-50 transition">
            파일 찾기
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
            />
          </label>
        </div>
      </div>

      {/* 선택 서비스 - 텍스트 + 버튼 */}
      <div>
        <label className="block mb-1 text-sm text-gray-600">선택 서비스</label>
        {/* === 선택된 서비스 텍스트 한 줄로 출력 === */}
        <div className="mb-2 text-base font-semibold text-gray-900">
          {SERVICE_TYPE_LABEL_MAP[form.type]}
        </div>
        {/* === SelectionService 버튼 === */}
        <SelectionService selectedType={form.type} onSelect={handleTypeSelect} />
      </div>

      {/* 날짜/마감일 */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-600">모임 날짜</label>
          <DatePicker
            selected={meetingDate}
            onChange={setMeetingDate}
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-orange-500"
            placeholderText="모임 날짜 선택"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-600">마감 날짜</label>
          <DatePicker
            selected={deadlineDate}
            onChange={setDeadlineDate}
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-orange-500"
            placeholderText="마감 날짜 선택"
          />
        </div>
      </div>

      {/* 정원 */}
      <div>
        <label className="block mb-1 text-sm text-gray-600">모집 정원</label>
        <input
          type="number"
          name="capacity"
          min={5}
          value={form.capacity}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:border-orange-500"
          placeholder="최소 5인 이상 입력해주세요."
        />
      </div>

      {/* 에러메시지 */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* 확인 버튼 */}
      <button
        type="submit"
        className={`w-full py-3 rounded-lg font-semibold text-white transition 
        ${!form.name || !form.location || !meetingDate || !form.image || !form.capacity
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-orange-500 hover:bg-orange-600"
        }`}
        disabled={!form.name || !form.location || !meetingDate || !form.image || !form.capacity}
      >
        확인
      </button>
    </form>
  );
}
