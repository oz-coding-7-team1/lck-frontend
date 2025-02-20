import api from "./api";
import {
  RegisterUserData,
  User,
  Terms,
  TermAgreement,
} from "@/src/types/api";

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string }>("/users/login/", {
      email,
      password,
    }),
  logout: () => api.post<void>("/users/logout/"),
  getUserInfo: () => api.get<User>("/users/mypage/"),
  updateUserInfo: (userData: User) =>
    api.put<User>("/users/mypage/", userData),
  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => api.post<void>("/users/password/", passwordData),
  register: (userData: RegisterUserData) =>
    api.post<User>("/users/signup/", userData),
  getTerms: () => api.get<Terms[]>("/users/terms/"),
  createTerms: (termsData: Terms) =>
    api.post<Terms>("/users/terms/", termsData),
  getUserTermsAgreement: () =>
    api.get<TermAgreement[]>("/users/terms/agree/"),
  updateUserTermsAgreement: (id: number, agreementData: TermAgreement) =>
    api.patch<TermAgreement>(
      `/users/terms/agree/${id}/`,
      agreementData
    ),
  obtainToken: (tokenData: { email: string; password: string }) =>
    api.post<{ access: string; refresh: string }>(
      "/users/token/obtain/",
      tokenData
    ),
  refreshToken: (tokenData: { refresh: string }) =>
    api.post<{ access: string }>(
      "/users/token/refresh/",
      tokenData
    ),
  verifyToken: (tokenData: { token: string }) =>
    api.post<void>("/users/token/verify/", tokenData),
  withdraw: () => api.post<void>("/users/withdraw/"),
};
