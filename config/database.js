const mongoose = require("mongoose");
const logger = require("../logger");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    logger.info(`Mongodb is Connected ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error in mongodb connection ${error}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
