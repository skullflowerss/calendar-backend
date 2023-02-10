const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CNN, { autoIndex: true });
    console.log("db online");
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

module.exports = { dbConnection };
