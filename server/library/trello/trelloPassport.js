const passport = require("passport");
const TrelloStrategy = require("passport-trello");
const keys = require("../keys.js");
const trelloUser = require("./TrelloModel.js");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
}); // this function is after creating the user

passport.deserializeUser((id, done) => {
  TrelloUser.findById(id).then(p => {
    done(null, p);
  });
});

////////////////////////////////////////////////////////////

// TrelloStrategy = require('passport-trello').Strategy

// passport.use 'trello', new TrelloStrategy(
//     consumerKey: TRELLO_ID
//     consumerSecret: TRELLO_SECRET
//     callbackURL: TRELLO_CALLBACK
//     passReqToCallback: true
//     trelloParams:
//         scope: "read,write"
//         name: "MyApp"
//         expiration: "never"
//     (req, token, tokenSecret, profile, done) ->
//         if not req.user
//             # user is not authenticated, log in via trello or do something else
//         else
//             # authorize user to use Trello api
// )

/////////////////////////////////////////////////////////////

passport.use(
  new TrelloStrategy(
    {
      callbackURL: "/auth/trello/callback",
      clientID: keys.trello.clientID,
      clientSecret: keys.trello.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      TrelloUser.findOne({ trelloId: profile.id })
        .then(p => {
          if (p) {
            console.log("existing user", p);

            done(null, p);
          } else {
            const obj = {
              username: profile.displayName,
              trelloId: profile.id
            };
            const newTrelloUser = new TrelloUser(obj);
            newTrelloUser.save().then(p => {
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
