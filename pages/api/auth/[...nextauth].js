import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
providers: [
GoogleProvider({
clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
authorization: {
params: {
scope:
"openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets",
},
},
}),
],
callbacks: {
async jwt({ token, account }) {
if (account) {
token.accessToken = account.access_token;
}
return token;
},
async session({ session, token }) {
session.accessToken = token.accessToken;
return session;
},
},
pages: {
signIn: "/login",
},
};
export default NextAuth(authOptions);