"use client";

import { useState, useEffect } from "react";
import { GatheringType } from "@/types/gathering";

const SERVICE_OPTIONS: { id: GatheringType; label: string }[] = [
  { id: GatheringType.OFFICE_STRETCHING, label: "오피스 스트레칭" },
  { id: GatheringType.MINDFULNESS, label: "마인드풀니스" },
  { id: GatheringType.WORKATION, label: "워케이션" },
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
    <div className="mb-5 w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        서비스 종류
      </label>
      <div className="flex flex-wrap gap-2">
        {SERVICE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              setSelected(opt.id);
              onSelect(opt.id);
            }}
            className={`rounded border px-4 py-2 text-sm font-medium ${
              selected === opt.id
                ? "border-gray-500 bg-gray-500 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
