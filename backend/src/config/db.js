import mongoose from "mongoose";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // In production, MONGODB_URI is mandatory — fail fast with a clear message.
  if (IS_PRODUCTION && !uri) {
    console.error("[Database] FATAL: MONGODB_URI environment variable is not set.");
    console.error("[Database] Please add MONGODB_URI to your Render environment variables.");
    process.exit(1);
  }

  // Use Atlas URI in production, fall back to local URI in development.
  const connectionUri = uri || "mongodb://localhost:27017/timeless_haute_horlogerie";

  try {
    console.log(`[Database] Connecting to MongoDB...`);
    await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(
      `[Database] MongoDB connected successfully to: ${mongoose.connection.host}/${mongoose.connection.name}`
    );
  } catch (err) {
    console.warn(`[Database] Standard MongoDB connection failed: ${err.message}`);

    // In production, never attempt an in-memory fallback — crash instead so the
    // error is visible in Render logs and the service does not start in a broken state.
    if (IS_PRODUCTION) {
      console.error("[Database] FATAL: Cannot connect to MongoDB Atlas in production. Exiting.");
      process.exit(1);
    }

    // Development only: fall back to an in-memory MongoDB instance.
    console.log("[Database] Falling back to in-memory MongoDB for local development...");
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();

      await mongoose.connect(memoryUri);
      console.log(`[Database] In-memory MongoDB connected at: ${memoryUri}`);
      console.log(
        "[Database] TIP: Set MONGODB_URI in backend/.env to use a real database (e.g., MongoDB Atlas)."
      );
    } catch (memoryErr) {
      console.error("[Database] Failed to start in-memory MongoDB fallback:", memoryErr.message);
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
    console.log("[Database] MongoDB disconnected cleanly.");
  } catch (err) {
    console.error("[Database] Disconnect error:", err.message);
  }
};
