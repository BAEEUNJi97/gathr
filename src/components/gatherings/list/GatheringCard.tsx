import { forwardRef } from 'react';
import { useRouter } from "next/navigation";
import { Gathering } from '@/types/gathering';
import Image from 'next/image';
import { formatDate, formatTime, getTimeRemaining } from '@/components/common/format';
import JoinedCountsProgressBar from './JoinedCountsProgressBar';
import { Heart, AlarmClock, UserRoundCheck, CheckCircle2 } from 'lucide-react';

// Props 타입 별도 선언
interface GatheringCardProps {
  gathering: Gathering;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

// ref, props 타입을 명확히!
const GatheringCard = forwardRef<HTMLDivElement, GatheringCardProps>(
  ({ gathering, isLiked = false, onToggleLike }, ref) => {
    const router = useRouter();
    const expired = getTimeRemaining(gathering.registrationEnd) === '마감됨';
    const confirmed = gathering.participantCount >= 5;

    return (
      <section
        role="button"
        tabIndex={0}
        ref={ref}
        onClick={expired ? undefined : () => router.push(`/gatherings/detail/${gathering.id}`)}
        className="w-full flex flex-col md:flex-row justify-start border border-gray-200 rounded-2xl bg-white hover:border-main-300 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
      >
        {/* [마감 오버레이] */}
        {expired && (
          <div className="absolute bg-black/80 inset-0 z-10 flex items-center justify-center text-center">
            <div className="px-4 py-2 rounded-lg flex flex-col text-sm text-white">
              <span>마감된 챌린지에요,</span>
              <span>다음 기회에 만나요🙌</span>
            </div>
          </div>
        )}

        {/* [썸네일 + 상단 뱃지] */}
        <div className="w-full md:w-80 h-48 md:h-40 relative flex-shrink-0">
          <Image
            src={gathering.image}
            alt="모임 이미지"
            fill
            className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          {/* [오늘 21시 마감] */}
          <div
            className={`
              absolute top-3 left-3
              flex items-center
              px-3 py-1.5
              rounded-lg
              bg-amber-500
              shadow
              text-white
              font-semibold
              text-sm
              z-10
            `}
          >
            <AlarmClock className="w-4 h-4 text-white mr-1" />
            <span>
              {getTimeRemaining(gathering.registrationEnd)}
            </span>
          </div>
        </div>

        {/* [카드 우측(내용)] */}
        <div className="flex-1 flex flex-col justify-between p-4 md:p-6 min-h-0">
          <div className="flex-1 w-full">
            {/* [타이틀, 장소] */}
            <div className="flex flex-row md:justify-between gap-3">
              <div className="flex-1 flex flex-row gap-2 items-center">
                <h1 className={`text-lg font-semibold ${expired ? 'text-gray-500' : 'text-gray-900'}`}>{gathering.name}</h1>
                <div className={`hidden sm:block w-[2px] h-[16px] ${expired ? 'bg-gray-500' : 'bg-gray-900'}`} />
                <p className={`text-sm font-medium ${expired ? 'text-gray-500' : 'text-gray-700'}`}>{gathering.location}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="찜하기"
              onClick={e => { e.stopPropagation(); onToggleLike?.(); }}
              className="absolute top-3 right-3 rounded-full p-1 bg-white/90 hover:bg-white z-10 shadow-md transition"
              tabIndex={-1}
            >
              <Heart className={`w-7 h-7 ${isLiked ? 'fill-orange-400 stroke-orange-400' : 'stroke-gray-400'}`} />
            </button>
            {/* [날짜/시간 뱃지] */}
            <div className="flex flex-wrap gap-2 mb-3 mt-2">
              <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md ${expired ? 'border-gray-400 text-gray-500' : 'border-main-500 text-main-600'}`}>{formatDate(gathering.dateTime)}</span>
              <span className={`inline-flex items-center px-3 py-1 border-2 text-sm font-medium rounded-md ${expired ? 'border-gray-400 text-gray-500' : 'border-main-500 text-main-600'}`}>{formatTime(gathering.dateTime)}</span>
            </div>
          </div>

          {/* [하단: 인원수/진행바/join now] */}
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserRoundCheck className={`w-4 h-4 ${expired ? 'text-gray-400' : 'text-main-500'}`} />
              <span className={`text-sm font-medium ${expired ? 'text-gray-500' : 'text-gray-700'}`}>
                {gathering.participantCount}/{gathering.capacity}
              </span>
              {/* [개설확정 뱃지] */}
              {confirmed && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-main-500 bg-main-100 text-xs font-bold border border-main-200 ml-1">
                  <CheckCircle2 className="w-3 h-3 text-main-500 mr-0.5" />
                  개설확정
                </span>
              )}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <JoinedCountsProgressBar participantCount={gathering.participantCount} capacity={gathering.capacity} />
              {!expired && <span className="text-main-500 font-semibold text-sm whitespace-nowrap">join now →</span>}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

GatheringCard.displayName = 'GatheringCard';
export default GatheringCard;
