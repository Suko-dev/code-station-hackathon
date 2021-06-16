import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    }),
  ],
  jwt: {
    secret: process.env.SECRET,
  },
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     const { email, image, name } = user;

  //     try {
  //       // TODO Buscar user por email e caso ele não exista criar um user

  //       return true;
  //     } catch (error) {
  //       return false;
  //     }
  //   },
  // },
});
