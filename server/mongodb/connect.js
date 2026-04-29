import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(url, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log('connected to mongo');
};

export default connectDB;
