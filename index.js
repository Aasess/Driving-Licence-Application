const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

//global variables to handle navigation
global.isLoggedIn = null;
global.isDriverLoggedIn = null;
global.isAdminLoggedIn = null;
global.isExaminerLoggedIn = null;

//middleware
const validationMiddleware = require("./middleware/validation");
const authMiddleware = require("./middleware/auth");

// database
const connectDB = require("./db/connectDB");

//controllers
const controllers = require("./controllers");

//create new express application
const app = new express();

//connect to MongoDB
connectDB();

// serve static files from public folder
app.use(express.static("public"));

//add `body-parser` to middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add `express-session` to middleware
app.use(expressSession({ secret: "AshishKey" }));

//check whether user is logged in and also check whether user is logged in as driver or not?
app.use("*", (req, res, next) => {
  isLoggedIn = req.session.userId;
  isDriverLoggedIn = req.session.userId && req.session.userType === "Driver";

  //check whether logged in user is admin or not
  isAdminLoggedIn = req.session.userId && req.session.userType === "Admin";

  //check whether logged in user is examiner or not
  isExaminerLoggedIn =
    req.session.userId && req.session.userType === "Examiner";
  next();
});

// use ejs as templating engine
app.set("view engine", "ejs");

// handle requests with express
app.get("/", controllers.home);

app.get("/license/g2", authMiddleware.driverAuth, controllers.licenseG2);

app.get("/license/g", authMiddleware.driverAuth, controllers.licenseG);

app.get("/auth", controllers.auth);

// POST method to handle user form submission from G2 Page
app.post("/addUser", validationMiddleware, controllers.addUser);

// POST method to retrive user from database
app.post("/fetchUser", authMiddleware.driverAuth, controllers.fetchUser);

//POST method to update user from databse
app.post("/license/g", authMiddleware.driverAuth, controllers.updateUser);

//POST method to handle user registration
app.post("/signup", controllers.signupUser);

//POST method to handle user login
app.post("/login", controllers.loginUser);

//GET method to handle user logout
app.get("/logout", controllers.logout);

//GET method to handle appointment view
app.get("/appointment", authMiddleware.adminAuth, controllers.appointment);

//POST method to handle making an appointment visible to user
app.post(
  "/appointment",
  authMiddleware.adminAuth,
  controllers.postBookAppointment
);

//GET method to fetch slots from "Appointment model" to User
app.get("/available-slots/:driverType", controllers.availableSlots);

//POST method to book an appointment by driver
app.post("/available-slots", controllers.postAppointmentSlotDriver);

//GET method to handle examiner view
app.get("/examiner", authMiddleware.examinerAuth, controllers.examiner);

//GET method to handle test type in examiner view
app.get(
  "/examiner/testType",
  authMiddleware.examinerAuth,
  controllers.examinerTestTypeSelect
);

//POST method to handle examiner reviews with comments and status
app.post("/examiner", authMiddleware.examinerAuth, controllers.examinerReview);

//GET method to handle driver status from Admin
app.get(
  "/driver-status",
  authMiddleware.adminAuth,
  controllers.driverStatusAdmin
);

app.get("/driver-review", authMiddleware.driverAuth, controllers.driverReview);

app.listen(4000, () => {
  console.log("Sever running at port 4000");
});
