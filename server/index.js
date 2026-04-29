import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    const port = process.env.PORT || 8080;
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI;
    app.listen(port, () => console.log(`Server started on port ${port}`));

    if (!mongoUrl) {
      console.warn('MongoDB URL is missing. Set MONGODB_URL (or MONGODB_URI) in server/.env');
      return;
    }

    try {
      await connectDB(mongoUrl);
    } catch (dbError) {
      console.error('MongoDB connection failed. API is running, but database features may not work.');
      console.error(dbError.message);
    }
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();
