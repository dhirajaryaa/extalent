import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import {
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
} from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile); // just retune row profile info.
    }
  )
);

export default passport;