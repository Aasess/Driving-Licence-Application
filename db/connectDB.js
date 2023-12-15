const mongoose = require("mongoose");

const connectDB = () => {
  const uri =
    "mongodb+srv://cluster0.qsurdrp.mongodb.net/?retryWrites=true&w=majority";
  const options = {
    //option to maintain stable connection
    useNewUrlParser: true,
    useUnifiedTopology: true,

    //authentication
    user: "ashishneupane1997",
    pass: "12345",
    dbName: "licenseDB",
  };
  return mongoose
    .connect(uri, options)
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((error) => console.log(error));
};

module.exports = connectDB;
