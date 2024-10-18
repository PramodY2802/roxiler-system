import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import chart.js registerables
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './BarChartPage.css';

Chart.register(...registerables); // Register all necessary components

const BarChartPage = () => {
  const [barChartData, setBarChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Helper function to extract query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const params = getQueryParams(location.search);
  const month = params.get('month') || '3'; // Default to March
  const year = params.get('year') || new Date().getFullYear(); // Default to current year

  useEffect(() => {
    fetchBarChartData(); // Fetch bar chart data when the component mounts
  }, [month, year]);

  const fetchBarChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions-chart`, {
        params: { month, year }, // Pass month and year to the backend
      });
      setBarChartData(response.data.chartData);
      setError(null);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError('Error fetching chart data');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['0-50', '51-100', '101-200', '201-500', '500+'],
    datasets: [
      {
        label: `Transactions in ${month}/${year}`,
        data: barChartData ? Object.values(barChartData) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Transactions',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Transactions Price Distribution',
      },
    },
  };

  return (
    <div>
      <h1>Transactions Bar Chart</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {barChartData && (
        <div style={{ width: '70%', margin: '0 auto', marginTop: '30px' }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default BarChartPage;
