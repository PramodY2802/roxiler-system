import express from 'express';
import {
  getTransactions,
  getTransactionsChart, // Import the chart controller
} from '../controllers/transactionController.js';

const router = express.Router();

// Route to get transactions for a specific month and year
router.get('/transactions', getTransactions);

// Route to get bar chart data for a specific month and year
router.get('/transactions-chart', getTransactionsChart);

export default router;
