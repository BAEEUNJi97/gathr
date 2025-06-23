// src/app/gatherings/detail/[id]/page.tsx
import { notFound } from 'next/navigation';
import GatheringDetailPage from '@/components/gatherings/detail/GatheringDetailPage';
import { getGatheringDetail } from '@/services/gatheringService';
import { GatheringDetail } from '@/types/gathering';
import axios from 'axios';

interface PageProps {
  params: Promise<{ id: string }>;   // ← Promise로 다시 감싸기
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;       // ← await으로 id를 꺼냅니다
  let detail: GatheringDetail;

  try {
    detail = await getGatheringDetail(Number(id));
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return notFound();
    }
    throw err;
  }

  return <GatheringDetailPage detail={detail} />;
}
