import PlayerSubscribeButton from "@/src/components/common/PlayerSubscribeButton";
import SocialLinks from "@/src/components/common/SocialLinks";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerGallery from "@/src/components/player/PlayerGallery";
import PlayerSchedule from "@/src/components/player/PlayerSchedule";
import { playerApi } from "@/src/services/playerApi";
import { teamApi } from "@/src/services/teamApi";
import Image from "next/image";
import { notFound } from "next/navigation";
import { encodePlayerName } from "@/src/utils/urlUtils";
import { Player } from "@/src/types/player";
import { subscriptionApi } from "@/src/services/subscriptionApi";

type Props = {
  params: Promise<{ nickname: string }>;
};

export default async function PlayerPage({ params }: Props) {
  const { nickname } = await params;
  // 모든 선수 목록을 가져오기
  const players = await playerApi.getPlayers();

  // nickname을 기준으로 선수 찾기
  const player = players.data.find(
    (p) => encodePlayerName(p.nickname) === nickname
  ) as Player;

  if (!player) return notFound(); // 선수가 없으면 404 처리

  // 선수의 ID로 정확한 선수 정보 조회
  const playerDetails = await playerApi.getPlayerById(player.id);
  const playerSubscribeCount = await subscriptionApi.getPlayerSubscriptionCount(player.id);

  // 팀 정보 조회 (선수의 team_id가 있다면)
  const team = playerDetails.data.team_id
    ? (await teamApi.getTeamById(playerDetails.data.team_id)).data
    : null;

    return (
      <>
        <div
          className="bg-cover bg-center h-[360px] absolute w-full -z-1"
          style={{
            backgroundImage: playerDetails.data.background_image_url
              ? `url(${playerDetails.data.background_image_url})`
              : "none", // 배경 이미지가 없을 경우 none
            backgroundColor: playerDetails.data.background_image_url
              ? "none"
              : "#CDCAE9", // 배경 이미지가 없을 경우 배경색 설정
          }} 
        ></div>
        <div className="container p-6 mx-auto pt-[300px] relative">
          <div className="flex items-center">
            <Image
              src={playerDetails.data.profile_image_url || "/default-profile.png"} // 기본 프로필 이미지 추가
              alt={playerDetails.data.nickname}
              width={200}
              height={200}
              className="border-[5px] border-white"
            />
            <div>
              <h1 className="text-3xl font-bold">
                {playerDetails.data.nickname}
                <PlayerSubscribeButton playerId={playerDetails.data.id} />
              </h1>
              <p className="text-gray-500">{playerDetails.data.realname}</p>
              <p className="text-blue-500">♥{playerSubscribeCount.data.count}</p>
            </div>
            <SocialLinks
              links={playerDetails.data.social}
              iconClassName="w-6 h-6"
            />
          </div>
  
          <div className="grid grid-cols-10 gap-4 mt-6">
            <div className="col-span-3 p-4 border rounded-lg shadow">
              <h2 className="text-xl font-bold">PLAYER INFO.</h2>
              <p className="py-2">
                이름 
                <strong className="block text-xl">{playerDetails.data.realname}</strong>
              </p>
              <p className="py-2">
                생년월일 
                <strong className="block text-xl">{playerDetails.data.date_of_birth}</strong>
              </p>
              <p className="py-2">
                국적 
                <strong className="block text-xl">{playerDetails.data.nationality}</strong>
              </p>
              <p className="py-2">
                데뷔 
                <strong className="block text-xl">{playerDetails.data.debut_date}</strong>
              </p>
              <p className="py-2">
                포지션 
                <strong className="block text-xl">{playerDetails.data.position}</strong>
              </p>
              <p className="py-2">
               소속 팀
               <strong className="block text-xl">{team ? team.name : "소속팀 없음"}</strong>
              </p>
              <p className="py-2">
                소속사
                <strong className="block text-xl">{playerDetails.data.agency}</strong>
              </p>
              <p className="py-2">
                game ID
                <strong className="block text-xl">{playerDetails.data.gamename}</strong>
              </p>
            </div>
            <div className="col-span-7">
              <PlayerSchedule
                playerId={playerDetails.data.id}
                teamId={playerDetails.data.team_id}
              />
            </div>
          </div>
  
          <div className="grid grid-cols-10 gap-4 mt-6">
            <div className="col-span-6">
              <CommunitySimple type="player" entityId={playerDetails.data.id} />
            </div>
            <div className="col-span-4">
              <PlayerGallery playerId={playerDetails.data.id} />
            </div>
          </div>
        </div>
      </>
    );
}
