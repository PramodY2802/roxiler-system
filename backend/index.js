import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes.js';
import { seedDatabase } from './seed/seedDatabase.js'; // Assuming you have a seed function

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Database connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect('mongodb+srv://pramodyadav3142:root@web.kbznxes.mongodb.net/transactionsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Optional: Seed the database
    seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('DB connection error:', error);
  });
