import Transaction from '../models/Transaction.js';

// Helper function to fetch transactions data
// Helper function to fetch transactions data
const getTransactionsDataByMonth = async (month, year) => {
  const startDate = new Date(year, month - 1, 1); // Start of the month
  const endDate = new Date(year, month, 1); // Start of the next month

  const transactions = await Transaction.find({
    dateOfSale: { $gte: startDate, $lt: endDate },
  });

  return transactions;
};

// Get transactions for a specific month
export const getTransactions = async (req, res) => {
  const { month, year } = req.query;

  try {
    if (month && year) {
      const transactions = await getTransactionsDataByMonth(month, year);
      res.json({ transactions });
    } else {
      // Return an error if month or year is not provided
      res.status(400).json({ error: 'Month and year are required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const getTransactionsChartDataByMonth = async (month, year) => {
  const startDate = new Date(year, month - 1, 1); // Start of the month
  const endDate = new Date(year, month, 1); // Start of the next month

  const transactions = await Transaction.find({
    dateOfSale: { $gte: startDate, $lt: endDate },
  });

  // Group transactions into price ranges
  const priceRanges = {
    '0-50': 0,
    '51-100': 0,
    '101-200': 0,
    '201-500': 0,
    '500+': 0,
  };

  transactions.forEach((transaction) => {
    const price = transaction.price;
    if (price <= 50) {
      priceRanges['0-50'] += 1;
    } else if (price <= 100) {
      priceRanges['51-100'] += 1;
    } else if (price <= 200) {
      priceRanges['101-200'] += 1;
    } else if (price <= 500) {
      priceRanges['201-500'] += 1;
    } else {
      priceRanges['500+'] += 1;
    }
  });

  return priceRanges;
};

// API endpoint to get chart data for a specific month and year
export const getTransactionsChart = async (req, res) => {
  const { month, year } = req.query;

  try {
    if (month && year) {
      const chartData = await getTransactionsChartDataByMonth(month, year);
      res.json({ chartData });
    } else {
      res.status(400).json({ error: 'Month and year are required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};