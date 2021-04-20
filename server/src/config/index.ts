import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * The default port for the server to run on.
   */
  port: process.env.PORT,

  /**
   * Connection string for MongoDB
   */
  MONGODB_URI: process.env.MONGODB_URI || ""
}