// function that validates form data
const validation = (req, res, next) => {
  //check if license number is of 8 digit or not
  if (req.body.licenseNo.length != 8) {
    return res.render("g2License", {
      successMsg: null,
      errorMsg: "Please Enter 8 Characters License Number.",
      slots: null,
    });
  }

  //call the next middleware
  next();
};

module.exports = validation;
