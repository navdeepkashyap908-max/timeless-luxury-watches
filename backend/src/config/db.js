import mongoose from "mongoose";

let isMemoryServer = false;
let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/timeless_haute_horlogerie";

  try {
    // Attempt standard connection to the configured MONGODB_URI
    console.log(`[Database] Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3500,
    });
    console.log(`[Database] MongoDB connected successfully to: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.warn(`[Database] Standard MongoDB connection failed: ${err.message}`);
    console.log(`[Database] Falling back to automated in-memory MongoDB instance for local development/testing...`);

    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      isMemoryServer = true;

      await mongoose.connect(memoryUri);
      console.log(`[Database] In-memory MongoDB connected successfully at: ${memoryUri}`);
      console.log(`[Database] TIP: You can provide your own MongoDB connection string in backend/.env (e.g., MongoDB Atlas or local mongod).`);
    } catch (memoryErr) {
      console.error(`[Database] Failed to start in-memory MongoDB fallback:`, memoryErr.message);
      throw memoryErr;
    }
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
    console.log(`[Database] MongoDB disconnected cleanly.`);
  } catch (err) {
    console.error(`[Database] Disconnect error:`, err.message);
  }
};
