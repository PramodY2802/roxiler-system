import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transaction.css';
import { Link } from 'react-router-dom';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('3'); // Default to March
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  useEffect(() => {
    if (month && year) {
      fetchTransactions(); // Fetch transactions when month or year changes
    }
  }, [month, year]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions`, {
        params: { month, year }, // Pass month and year to the backend
      });
      setTransactions(response.data.transactions);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>

      <label htmlFor="month">Select Month:</label>
      <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <label htmlFor="year">Select Year:</label>
      <input
        type="number"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="2000" // Set a reasonable minimum year
      />

      <button onClick={fetchTransactions}>Fetch Transactions</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to={`/bar-chart?month=${month}&year=${year}`}>View Bar Chart</Link>

    </div>
  );
};

export default TransactionsPage;
