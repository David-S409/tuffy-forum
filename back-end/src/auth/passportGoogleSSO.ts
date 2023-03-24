import { PrismaClient, User } from '@prisma/client';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const GoogleStrat = GoogleStrategy.Strategy;
const CALLBACK_URL = 'http://localhost:8080/api/v1/auth/google/callback';
const primsa = new PrismaClient();
passport.use(
  new GoogleStrat(
    {
      clientID: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const user = await primsa.user
        .upsert({
          where: {
            googleID: profile.id,
          },
          update: {},
          create: {
            createdAt: new Date(),
            googleID: profile.id,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            email: profile.emails?.[0].value || '',
            profileImg: profile.photos?.[0].value,
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Error Signing up', err);
          cb(err, undefined);
        });

      if (user) return cb(null, user);
      return cb(null, undefined);
    }
  )
);

passport.serializeUser((user, cb) => {
  // console.log('Serialize user');
  cb(null, user);
});

passport.deserializeUser(async (u: User, cb) => {
  const user = await primsa.user
    .findUnique({
      where: {
        googleID: u.googleID,
      },
    })
    .catch((err) => {
      // console.error('Error Deserializing', err);
      cb(err, null);
    });
  // console.log('Deserialized user.', user);
  if (user) cb(null, user);
});
