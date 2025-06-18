'use client';

import { useState, useEffect } from 'react';
import { GatheringType } from '@/types/gathering';

const SERVICE_OPTIONS: { id: GatheringType; label: string }[] = [
  { id: GatheringType.DALLAEM_FIT,       label: '달램핏' },
  { id: GatheringType.OFFICE_STRETCHING, label: '오피스 스트레칭' },
  { id: GatheringType.MINDFULNESS,       label: '마인드풀니스' },
  { id: GatheringType.WORKATION,         label: '워케이션' },
];

interface Props {
  selectedType: GatheringType;
  onSelect: (type: GatheringType) => void;
}

export default function SelectionService({ selectedType, onSelect }: Props) {
  const [selected, setSelected] = useState<GatheringType>(selectedType);

  useEffect(() => {
    setSelected(selectedType);
  }, [selectedType]);

  return (
    <div className="w-full mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">서비스 종류</label>
      <div className="flex gap-2 flex-wrap">
        {SERVICE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setSelected(opt.id);
              onSelect(opt.id);
            }}
            className={`px-4 py-2 border rounded text-sm font-medium ${
              selected === opt.id
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
