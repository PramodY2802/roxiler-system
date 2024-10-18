import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  dateOfSale: { type: Date },
  sold: { type: Boolean },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
