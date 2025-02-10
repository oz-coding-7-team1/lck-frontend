import CommunityDetail from '@/src/components/community/CommunityDetail';

export default function CommunityDetailPage({
  params,
}: {
  params: { communityId: string };
}) {
  return <CommunityDetail communityId={Number(params.communityId)} />;
}
