const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

//my constant about my oauth from google developer api
const GOOGLE_CLIENT_ID =
    "761743576842-gv018uiuinrs3gdt7omu67qg140gbkg2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

//authentecation configration
passport.use(
    new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,

            //if authentecated goto this
            callbackURL: "/google/callback",
            passReqToCallback: true,
        },
        function(request, accessToken, refreshToken, profile, done) {
            //the incoming for work with DB
            /*  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
            return done(null, profile);
        }
    )
);

//serialization and deserialization
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});