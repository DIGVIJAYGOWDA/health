const mongoose = require('mongoose');

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    const useMemoryDb = process.env.USE_MEMORY_DB === 'true';

    const isLocalUri = uri && (uri.includes('localhost') || uri.includes('127.0.0.1'));

    // Use in-memory MongoDB when explicitly requested, or for local development
    // when no external MongoDB URI is configured.
    if (useMemoryDb || !uri || isLocalUri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log('Starting in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
