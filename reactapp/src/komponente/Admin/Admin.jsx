import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registracija potrebnih komponenti za ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    if (token) {
      fetchStatistics();
    }
  }, [token]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {statistics && (
        <div style={{margin:"10%"}}>
          <div>Total Users: {statistics.total_users}</div>
          <div>Total Meals: {statistics.total_meals}</div>
          <div>Total Food Items: {statistics.total_food_items}</div>

          <div>
            <h3>Meals Created Per Month</h3>
            <Bar
              data={{
                labels: statistics.meals_created_per_month.map(entry => entry.month),
                datasets: [{
                  label: 'Meals Created',
                  data: statistics.meals_created_per_month.map(entry => entry.total),
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                }],
              }}
            />
          </div>

          <div>
            <h3>New Users Per Month</h3>
            <Bar
              data={{
                labels: statistics.new_users_per_month.map(entry => entry.month),
                datasets: [{
                  label: 'New Users',
                  data: statistics.new_users_per_month.map(entry => entry.total),
                  backgroundColor: 'rgba(192,75,192,0.4)',
                  borderColor: 'rgba(192,75,192,1)',
                  borderWidth: 1,
                }],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
