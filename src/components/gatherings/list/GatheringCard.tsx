import { forwardRef } from 'react';
import { useRouter } from "next/navigation";
import { Gathering } from '@/types/gathering';
import Image from 'next/image';
import { formatDate, formatTime, getTimeRemaining } from '@/components/common/format';
import { UserRoundCheck } from 'lucide-react';
import JoinedCountsProgressBar from './JoinedCountsProgressBar';

interface Props {
  gathering: Gathering;
}

const GatheringCard = forwardRef<HTMLDivElement, Props>(({ gathering }, ref) => {
  const router = useRouter();
  const expired = getTimeRemaining(gathering.registrationEnd) === '마감됨';

  return (
    <section
      role="button"
      tabIndex={0}
      ref={ref}
      onClick={expired ? undefined : () => router.push(`/gatherings/detail/${gathering.id}`)}
      className="w-full flex flex-col md:flex-row justify-start border border-gray-200 rounded-2xl bg-white hover:border-main-300 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
    >
      {expired && (
        <div className="absolute bg-black/90 inset-0 z-10 flex items-center justify-center text-center">
          <div className="px-4 py-2 black-bg rounded-lg flex flex-col text-sm text-white">
            <span>마감된 챌린지에요,</span>
            <span>다음 기회에 만나요🙌</span>
          </div>
        </div>
      )}

      <div className="w-full md:w-80 h-48 md:h-40 relative flex-shrink-0">
        <Image
          src={gathering.image}
          alt="모임 이미지"
          fill
          className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className={`absolute top-3 left-3 rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm ${expired ? 'bg-gray-600' : 'bg-main-600'}`}>
          <Image src="/icons/Alarm.svg" alt="시간" width={16} height={16} />
          <span className="text-sm font-medium text-white">{getTimeRemaining(gathering.registrationEnd)}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between p-4 md:p-6 min-h-0">
        <div className="flex-1 w-full">
          <div className="flex flex-row md:justify-between gap-3">
            <div className="flex-1 flex flex-row gap-2 items-center">
              <h1 className={`text-lg font-semibold -mt-6 ${expired ? 'text-gray-500' : 'text-gray-900'}`}>{gathering.name}</h1>
              <div className={`hidden sm:block w-[2px] h-[16px] -mt-6 ${expired ? 'bg-gray-500' : 'bg-gray-900'}`} />
              <p className={`text-sm font-medium -mt-6 ${expired ? 'text-gray-500' : 'text-gray-700'}`}>{gathering.location}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 -mt-3">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${expired ? 'bg-gray-400 text-white' : 'bg-main-500 text-white'}`}>{formatDate(gathering.dateTime)}</span>
            <span className={`inline-flex items-center px-3 py-1 border-2 text-sm font-medium rounded-md ${expired ? 'border-gray-400 text-gray-500' : 'border-main-500 text-main-600'}`}>{formatTime(gathering.dateTime)}</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <UserRoundCheck className={`w-4 h-4 ${expired ? 'text-gray-400' : 'text-main-500'}`} />
            <span className={`text-sm font-medium ${expired ? 'text-gray-500' : 'text-gray-700'}`}>
              {gathering.participantCount}/{gathering.capacity}
            </span>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <JoinedCountsProgressBar participantCount={gathering.participantCount} capacity={gathering.capacity} />
            {!expired && <span className="text-main-500 font-semibold text-sm whitespace-nowrap">join now →</span>}
          </div>
        </div>
      </div>
    </section>
  );
});

GatheringCard.displayName = 'GatheringCard';
export default GatheringCard;
