"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface UserProfile {
  email: string;
  nickname: string;
}

interface EditProfileForm {
  email: string;
  nickname: string;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const DEFAULT_PROFILE_IMAGE = "/images/default-avatar.svg";

export default function MyPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editForm, setEditForm] = useState<EditProfileForm>({
    email: "",
    nickname: "",
  });
  const [passwordForm, setPasswordForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://43.200.180.205/api/v1/users/mypage/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserProfile(response.data);
        setEditForm({
          email: response.data.email,
          nickname: response.data.nickname,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        router.push("/login");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete("http://43.200.180.205/api/v1/users/delete/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        handleLogout();
      } catch (error) {
        console.error("Account deletion failed:", error);
        alert("계정 삭제에 실패했습니다.");
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // Log the request data
      console.log("Sending update request with:", {
        url: "http://43.200.180.205/api/v1/users/mypage/",
        data: editForm,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Include the user ID in the update data
      const updateData = {
        id: userProfile?.id, // Assuming userProfile has an id field
        email: editForm.email,
        nickname: editForm.nickname,
      };

      const updateResponse = await axios.put(
        "http://43.200.180.205/api/v1/users/mypage/",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", updateResponse);

      // Refresh user data
      const profileResponse = await axios.get(
        "http://43.200.180.205/api/v1/users/mypage/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Profile refresh response:", profileResponse);

      setUserProfile(profileResponse.data);
      setIsEditingProfile(false);
      alert("프로필이 업데이트되었습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Profile update failed:", error.response?.data);
        alert(
          error.response?.data?.message || "프로필 업데이트에 실패했습니다."
        );
      } else {
        console.error("An unexpected error occurred:", error);
        alert("프로필 업데이트에 실패했습니다.");
      }
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        "http://43.200.180.205/api/v1/users/change-password/",
        {
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("비밀번호가 변경되었습니다.");
    } catch (error) {
      console.error("Password change failed:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Authentication required</div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 overflow-hidden rounded-full">
                <Image
                  src={DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                {userProfile.nickname}
              </h1>
              <p className="text-gray-600">{userProfile.email}</p>

              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  >
                    프로필 수정
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  >
                    비밀번호 변경
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    로그아웃
                  </button>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg">
              <h2 className="mb-4 text-xl font-bold">프로필 수정</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    닉네임
                  </label>
                  <input
                    type="text"
                    value={editForm.nickname}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nickname: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {isChangingPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg">
              <h2 className="mb-4 text-xl font-bold">비밀번호 변경</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    현재 비밀번호
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    새 비밀번호 확인
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 text-sm font-medium text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
