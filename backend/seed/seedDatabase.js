import axios from 'axios';
import Transaction from '../models/Transaction.js';

export const seedDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.insertMany(data);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed the database:', error);
  }
};
