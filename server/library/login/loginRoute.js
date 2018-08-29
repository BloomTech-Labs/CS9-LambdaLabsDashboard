import express from "express";
import UserModel from "../Users/userModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are logged-in ");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then(p => {
      p.checkPassWord(password)
        .then(result => {
          if (result) {
            const token = makeToken(p);
            const { _id } = p;
            res.status(200).json({ msg: "login successful", _id, token });
          } else {
            res.send("Incorrect password");
          }
        })
        .catch(err => {
          res.send("Something went wrong. Please try again");
        });
    })
    .catch(err => {
      res.send("User not found");
    });
});

// router.get('./logout', function(req, res, next) {
//   if(req.session) {
//       req.session.destroy(function(err) {
//           if(err) {
//               return next(err);
//           } else {
//               return res.redirect('/')
//           }
//       })
//   }
// };

module.exports = router;
