import CommunityDetail from "@/src/components/community/CommunityDetail";

export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  return <CommunityDetail postId={Number(params.id)} />;
}
