/* eslint-disable @typescript-eslint/no-unused-vars */
import SocialLinks from "@/src/components/common/SocialLinks";
import SubscribeButton from "@/src/components/common/TeamSubscribeButton";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamSchedule from "@/src/components/team/TeamSchedule";
import { subscriptionApi } from "@/src/services/subscriptionApi";
import { teamApi } from "@/src/services/teamApi";
import { Player } from "@/src/types/player";
import { Team } from "@/src/types/team";
import { encodeTeamName } from "@/src/utils/urlUtils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { encode } from "querystring";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function TeamPage({ params }: Props) {
  const { name } = await params;

  const teams = await teamApi.getTeams();

  const team = teams.data.find(
    (t) => encodeTeamName(t.name) === name) as Team;

  if (!team) return notFound(); // team이 없으면 404 처리

  const teamDetails = await teamApi.getTeamById(team.id);
  const teamSubsciribeCount = subscriptionApi.getTeamSubscriptionCount(team.id);

  return (
    <>
      <div
        className="bg-cover bg-center h-[580px] relative flex flex-col justify-end"
        style={{
          backgroundImage: (teamDetails.data.background_image_url) }}
      >
        {/* 블러 처리된 검정색 투명 그라데이션 추가 */}
        <div className="absolute inset-0 z-10 bg-black bg-opacity-40 backdrop-blur-sm"></div>

        {/* 콘텐츠는 하단에 배치 */}
        <div className="container relative z-20 p-6 mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <div className="w-full max-w-[180px] aspect-square bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={teamDetails.data.profile_image_url || "/default-profile-image.jpg"} // 기본 이미지 처리
                    alt={teamDetails.data.name}
                    width={150}
                    height={150}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{teamDetails.data.name}</h1>
                  <SocialLinks
                    links={teamDetails.data.social}
                    iconClassName="w-6 h-6 filter invert brightness-0"
                  />
                </div>
              </div>
              <SubscribeButton teamId={teamDetails.data.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="container p-6 mx-auto">
        <div className="mt-6">
          <h2 className="text-xl font-bold">Team Player</h2>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {(teamDetails.data.players && teamDetails.data.players.length > 0 ? teamDetails.data.players : []).map(
              (player: Player) => (
                <PlayerCard key={player.id} player={player} />
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-10 gap-20 mt-6">
          <div className="col-span-6">
            <CommunitySimple type="team" entityId={teamDetails.data.id} />
          </div>
          <div className="col-span-4">
            <TeamSchedule teamId={teamDetails.data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
