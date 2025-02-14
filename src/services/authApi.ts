import api from "./api";
import {
  RegisterUserData,
  APIResponse,
  User,
  Terms,
  TermAgreement,
} from "@/src/types/api";

export const authApi = {
  login: (email: string, password: string) =>
    api.post<APIResponse<{ token: string }>>("/users/login/", {
      email,
      password,
    }),
  logout: () => api.post<APIResponse<void>>("/users/logout/"),
  getUserInfo: () => api.get<APIResponse<User>>("/users/mypage/"),
  updateUserInfo: (userData: User) =>
    api.put<APIResponse<User>>("/users/mypage/", userData),
  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => api.post<APIResponse<void>>("/users/password/", passwordData),
  register: (userData: RegisterUserData) =>
    api.post<APIResponse<User>>("/users/signup/", userData),
  getTerms: () => api.get<APIResponse<Terms[]>>("/users/terms/"),
  createTerms: (termsData: Terms) =>
    api.post<APIResponse<Terms>>("/users/terms/", termsData),
  getUserTermsAgreement: () =>
    api.get<APIResponse<TermAgreement[]>>("/users/terms/agree/"),
  updateUserTermsAgreement: (id: number, agreementData: TermAgreement) =>
    api.patch<APIResponse<TermAgreement>>(
      `/users/terms/agree/${id}/`,
      agreementData
    ),
  obtainToken: (tokenData: { email: string; password: string }) =>
    api.post<APIResponse<{ access: string; refresh: string }>>(
      "/users/token/obtain/",
      tokenData
    ),
  refreshToken: (tokenData: { refresh: string }) =>
    api.post<APIResponse<{ access: string }>>(
      "/users/token/refresh/",
      tokenData
    ),
  verifyToken: (tokenData: { token: string }) =>
    api.post<APIResponse<void>>("/users/token/verify/", tokenData),
  withdraw: () => api.post<APIResponse<void>>("/users/withdraw/"),
};
