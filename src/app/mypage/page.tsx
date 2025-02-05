import { User } from 'lucide-react';

export default function ProfilePage() {
  const user = {
    nickname: 'UserNickname',
    email: 'user@example.com',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
        <div className="p-4 bg-white border rounded-lg shadow">
          <div className="flex items-center mb-4">
            <User className="w-12 h-12 mr-4 text-gray-600" />
            <div>
              <p className="text-lg font-semibold">{user.nickname}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              프로필 수정
            </button>
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              비밀번호 변경
            </button>
            <button className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
              로그아웃
            </button>
            <button className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
