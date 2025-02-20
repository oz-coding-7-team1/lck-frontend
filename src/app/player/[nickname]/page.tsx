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
    <div className="container p-6 mx-auto">
      <div className="flex flex-col items-center">
        <Image
          src={playerDetails.data.profile_image_url || "/default-profile.png"} // 기본 프로필 이미지 추가
          alt={playerDetails.data.nickname}
          width={150}
          height={150}
        />
        <div>
          <h1 className="text-3xl font-bold">
            {playerDetails.data.nickname}
            <PlayerSubscribeButton playerId={playerDetails.data.id} initialSubscribed={playerDetails.data.is_subscribed} />
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
          <p>
            <strong>이름</strong> {playerDetails.data.realname}
          </p>
          <p>
            <strong>생년월일</strong> {playerDetails.data.date_of_birth}
          </p>
          <p>
            <strong>국적</strong> {playerDetails.data.nationality}
          </p>
          <p>
            <strong>데뷔</strong> {playerDetails.data.debut_date}
          </p>
          <p>
            <strong>포지션</strong> {playerDetails.data.position}
          </p>
          <p>
            <strong>소속 팀</strong> {team ? team.name : "소속팀 없음"}
          </p>
          <p>
            <strong>소속사</strong> {playerDetails.data.agency}
          </p>
          <p>
            <strong>ID</strong> {playerDetails.data.gamename}
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
  );
}
