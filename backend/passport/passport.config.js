import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import User from "../models/user.model.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing User");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserializing User");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, passport, done) => {
      try {
        const user = await User.findOne(username);
        if (!user) {
          throw new Error("Invalid username or password");
        }

        const validPassword = bcrypt.compare(passport, user.password);
        if (!validPassword) {
          throw new Error("Invalid username or password");
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
