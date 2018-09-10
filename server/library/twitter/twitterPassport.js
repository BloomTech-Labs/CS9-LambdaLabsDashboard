const passport = require("passport");
const twitterStrategy = require("passport-twitter");
const keys = require("../keys.js");
const twitterUser = require("./twitterModel.js");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
}); // this function is after creating the user

passport.deserializeUser((id, done) => {
  twitterUser.findById(id).then(p => {
    done(null, p);
  });
});

passport.use(
  new twitterStrategy(
    {
      callbackURL: "/auth/twitter/callback",
      consumerKey: keys.twitter.clientID,
      consumerSecret: keys.twitter.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      twitterUser
        .findOne({ twitterId: profile.id })
        .then(p => {
          if (p) {
            console.log("existing user", p);

            done(null, p);
          } else {
            const obj = {
              username: profile.displayName,
              twitterId: profile.id
            };
            const newTwitterUser = new twitterUser(obj);
            newTwitterUser.save().then(p => {
              console.log("new user:", p);

              done(null, p);
            });
          }
        })

        .catch(err => {
          console.log("err:", err);
        });
    }
  )
);
