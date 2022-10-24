import "../config.js";
import passport from "passport";
import { Strategy, ExtractJwt }  from "passport-jwt";

import { find } from "../services/index.js";

const { JWT_SECRET } = process.env;

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await find({ id: jwtPayload.id });

      if (!user) {
        const err = new Error("User not found");
        err.statusCode = 404;
        throw err;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

export default {
  initialize,
  authenticate,
};