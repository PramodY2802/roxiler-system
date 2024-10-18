import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsPage from './components/TransactionsPage'; // Import the TransactionsPage component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import BarChartPage from './components/BarChartPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Default Route */}
                    <Route path="/" element={<TransactionsPage />} />
                    <Route path="/bar-chart" element={<BarChartPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
