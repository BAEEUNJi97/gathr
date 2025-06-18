import React from 'react';

interface JoinedCountsProgressBarProps {
  participantCount: number;
  capacity: number;
}

export default function JoinedCountsProgressBar({
  participantCount,
  capacity,
}: JoinedCountsProgressBarProps) {
  const percentage = Math.min(100, (participantCount / capacity) * 100);

  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-main-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
