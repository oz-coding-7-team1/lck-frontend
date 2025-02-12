"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggedOut] = useState(false);
  const [nickname, setNickname] = useState("UserNickname");
  const [email] = useState("user@example.com");
  const [profileIcon, setProfileIcon] = useState("/path/to/default/icon.png");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handleLogoutClick = async () => {
    try {
      // Save any necessary data to session storage before logging out
      sessionStorage.setItem("lastLogoutTime", new Date().toISOString());
      sessionStorage.setItem(
        "lastLoggedInUser",
        session?.user?.name || "unknown"
      );

      alert("유저 회원탈퇴");
      // Logic to delete the user's account goes here
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save changes logic here
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handlePasswordSaveClick = () => {
    setIsChangingPassword(false);
    // Save password change logic here
  };

  const handlePasswordCancelClick = () => {
    setIsChangingPassword(false);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileIcon(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (isLoggedOut) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">User logged out</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mt-6 mb-20 bg-white border rounded-lg shadow">
        {" "}
        {/* Adjusted mt-6 */}
        <h1 className="mb-4 text-2xl font-bold text-center">My Profile</h1>
        <div className="flex flex-col items-center mb-4">
          {" "}
          {/* Centered content */}
          <Image
            src={profileIcon}
            alt="Profile Icon"
            className="w-24 h-24 mb-4 rounded-full"
          />{" "}
          {/* Adjusted size and margin */}
          <div className="text-center">
            {" "}
            {/* Centered text */}
            <p className="text-lg font-semibold">{nickname}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <p
            className="w-full px-4 py-2 font-bold text-center text-blue-500 cursor-pointer hover:underline"
            onClick={handleEditClick}
          >
            프로필 수정
          </p>
          <p
            className="w-full px-4 py-2 font-bold text-center text-blue-500 cursor-pointer hover:underline"
            onClick={handlePasswordChangeClick}
          >
            비밀번호 변경
          </p>
          <p
            className="w-full px-4 py-2 font-bold text-center text-red-500 cursor-pointer hover:underline"
            onClick={handleLogoutClick}
          >
            로그아웃
          </p>
          <p className="w-full px-4 py-2 font-bold text-center text-red-500 cursor-pointer hover:underline">
            회원탈퇴
          </p>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">프로필 수정</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                프로필 아이콘
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleSaveClick}
              >
                저장
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                onClick={handleCancelClick}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {isChangingPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">비밀번호 변경</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                현재 비밀번호
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                새 비밀번호
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handlePasswordSaveClick}
              >
                저장
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                onClick={handlePasswordCancelClick}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
