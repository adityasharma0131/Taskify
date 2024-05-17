const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("./DB");
const Task = require("./Todo");

// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB with Mongoose
mongoose.connect("mongodb+srv://adityasharma0431:anant99@cluster0.vkam6md.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure passport to use GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "652686754259-567cljdto8o961jl4k7l8bvataogq0cs.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          email: profile.emails[0].value,
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
    failureRedirect: "http://localhost:5173/error",
    successRedirect: "http://localhost:5173/Dashboard",
  })
);

router.get('/login/success', async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User Login",
      user: req.user
    });
  } else {
    res.status(400).json({
      message: "Not Authorized"
    });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173");
  });
});

// Add this route to handle profile updates
router.post("/update-profile", async (req, res) => {
  try {
    const updatedUserData = req.body;
    // Update user profile in the database
    await User.findByIdAndUpdate(updatedUserData._id, updatedUserData);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/tasks", async (req, res) => {
  try {
    const { task, id } = req.body; // Extract task and user ID from request body

    // Validate task data (optional)

    // Create a new task document
    const newTask = await Task.create({ task, user: id }); // Store user ID along with the task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/tasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Retrieve tasks associated with the user ID
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/tasks/update-status", async (req, res) => {
  try {
    const { taskId, newStatus } = req.body;

    // Update task status in the database
    await Task.findByIdAndUpdate(taskId, { status: newStatus });

    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    // Delete the task from the database
    await Task.findByIdAndDelete(taskId);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Export the router
module.exports = router;