import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CaloriesBurnedComponent = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const activityList = ['running', 'walking', 'swimming'];  

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesData = [];

        for (const activity of activityList) {
          const response = await axios.get(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`, {
            headers: {
              'X-Api-Key': 'wldJVqp8aBoYHEhst6oQmXwRKc0gM0Dh7yXYkcge'  
            }
          });

          activitiesData.push(...response.data);
        }

        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [activityList]);

  return (
    <div className="calories-burned-container">
      <h2>Calories Burned Activities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="calories-burned-list">
          {activities.map(activity => (
            <li className="calories-burned-item" key={activity.name}>
              <h3>{activity.name}</h3>
              <p><strong>Calories per Hour:</strong> {activity.calories_per_hour}</p>
              <p><strong>Duration (minutes):</strong> {activity.duration_minutes}</p>
              <p><strong>Total Calories:</strong> {activity.total_calories}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default CaloriesBurnedComponent;
