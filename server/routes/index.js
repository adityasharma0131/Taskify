const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("./DB");

// Initialize Express application

// Connect to MongoDB with Mongoose
mongoose.connect("mongodb+srv://adityasharma0431:anant99@cluster0.vkam6md.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure passport to use GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID:"652686754259-567cljdto8o961jl4k7l8bvataogq0cs.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      try {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          profileImage: profile.photos[0].value,
        };

        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        done(error, null);
      }
    }
  )
);



// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

// Route for Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/dashboard",
  })
);

// Export the router
module.exports = router;
