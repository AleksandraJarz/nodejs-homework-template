const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const User = require("../models/users");

require("dotenv").config();

function setJWTStrategy() {
  const secret = process.env.SECRET;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await User.findOne({ _id: payload.id }).learn();
        if (!user) {
          return done(new Error("User not found."));
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
}

module.exports = setJWTStrategy;
