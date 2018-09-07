const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const keys = require("../keys.js");
const githubUser = require("./githubModel.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
}); // this function is after creating the user

passport.deserializeUser((id, done) => {
  githubUser.findById(id).then(p => {
    done(null, p);
  });
});

passport.use(
  new GithubStrategy(
    {
      callbackURL: "auth/github/callback",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      githubUser
        .findOne({ githubId: profile.id })
        .then(p => {
          if (p) {
            console.log("existing user", p);
            done(null, p);
          } else {
            const obj = {
              userEmail: profile.email[0].value,
              githubId: profile.id
            };
            const newGithubUser = new githubUser(obj);
            newGithubUser.save().then(p => {
              console.log("new user:", p);

              don(null, p);
            });
          }
        })
        .catch(err => {
          console.log("err:", err);
        });
    }
  )
);
