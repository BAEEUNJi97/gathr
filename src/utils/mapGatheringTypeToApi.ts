import { GatheringType } from '@/types/gathering';

// 프론트 enum → 서버 ENUM 변환
export function mapGatheringTypeToApi(type: GatheringType): string {
  switch (type) {
    case GatheringType.OFFICE_STRETCHING:
      return 'OFFICE_STRETCHING';
    case GatheringType.MINDFULNESS:
      return 'MINDFULNESS';
    case GatheringType.WORKATION:
      return 'WORKATION';
    default:
      throw new Error('Unknown GatheringType');
  }
}
