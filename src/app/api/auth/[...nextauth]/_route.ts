// import NextAuth, { NextAuthOptions, Session } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import KakaoProvider from "next-auth/providers/kakao";
// import NaverProvider from "next-auth/providers/naver";
// import { JWT } from "next-auth/jwt";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID!,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//     }),
//     NaverProvider({
//       clientId: process.env.NAVER_CLIENT_ID!,
//       clientSecret: process.env.NAVER_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session.user) {
//         (session.user as { id?: string }).id = token.sub as string; // ✅ 타입 단언 추가
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
