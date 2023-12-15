const mongoose = require("mongoose");

// create a Schema object
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define User Schema
const UserSchema = new Schema({
  //newly added fields
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  licenseNo: { type: String, default: "" },
  age: { type: Number, default: "" },
  dob: {
    type: Date,
  },
  car_details: {
    make: { type: String, default: "" },
    model: { type: String, default: "" },
    year: { type: Number, default: "" },
    plateNo: { type: String, default: "" },
  },
  appointmentId: {
    type: String,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  testType: {
    type: String,
    enum: ["G2", "G", null], // only allow "G2" or "G" or null as valid values
    default: null,
  },
  comment: {
    type: String,
    default: "",
  },
  isPass: {
    type: Boolean,
    default: null,
  },
});

//encrypt license number and password before saving into database
UserSchema.pre("save", async function (next) {
  const user = this;

  try {
    //hash the license number
    const licenseHash = await bcrypt.hash(user.licenseNo, 10);
    user.licenseNo = licenseHash;

    //hash the password and check whether it is modified or not
    if (!user.isModified("password")) {
      return next();
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;

    next();
  } catch (error) {
    next(error);
  }
});

//encrypt license number after updating user details too
UserSchema.pre("findOneAndUpdate", async function (next) {
  const licenseNumber = this._update?.licenseNo;

  try {
    if (licenseNumber) {
      //hash the license number
      const licenseHash = await bcrypt.hash(licenseNumber, 10);
      this._update.licenseNo = licenseHash;
    }
    next();
  } catch (error) {
    next(error);
  }
});
// define the User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
