import React, { useState } from 'react';
import axios from 'axios';

const MealForm = ({ onMealSubmit }) => {
  const [formData, setFormData] = useState({ 
    diet_plan_id: '1',
    name:'meal1',
    description: 'description1',
    time_of_day: 'uzina',
    calories: '200',
    proteins: '10',
    carbs: '10',
    fats: '10',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/meals', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onMealSubmit(response.data);  
      setFormData({
        diet_plan_id: '1',
        name:'meal1',
        description: 'description1',
        time_of_day: 'uzina',
        calories: '200',
        proteins: '10',
        carbs: '10',
        fats: '10',
      });
      sessionStorage.setItem('newMealId', response.data.data.id); // Čuvanje ID-a novog obroka u sessionStorage
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="diet-plan-generator" onSubmit={handleSubmit}>
      <h2>Create Meal</h2>
 
      <div style={{ marginBottom: '10px' }}>
        <input type="text" style={{ width:"80%"}} name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text"  style={{ width:"80%"}} name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" style={{ width:"80%"}} name="time_of_day" value={formData.time_of_day} onChange={handleChange} placeholder="Time of Day" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text"  style={{ width:"80%"}} name="calories" value={formData.calories} onChange={handleChange} placeholder="Calories" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" style={{ width:"80%"}}  name="proteins" value={formData.proteins} onChange={handleChange} placeholder="Proteins" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" style={{ width:"80%"}} name="carbs" value={formData.carbs} onChange={handleChange} placeholder="Carbs" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" style={{ width:"80%"}} name="fats" value={formData.fats} onChange={handleChange} placeholder="Fats" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

 
const FoodItemForm = () => {
  const [formData, setFormData] = useState({
    meal_id: sessionStorage.getItem('newMealId'), // Uzimanje ID-a novog obroka iz sessionStorage-a
    name: 'food item1',
    quantity: '10',
    unit: 'g',
    calories_per_unit: '15',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/foodItems', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        meal_id: Number(sessionStorage.getItem('newMealId')),
        name: 'food item1',
        quantity: '10',
        unit: 'g',
        calories_per_unit: '15',
      });
    } catch (error) {
      console.error('Error creating food item:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="diet-plan-generator" onSubmit={handleSubmit}>
      <h3>Dodaj sastojke:</h3>
      <div style={{ marginBottom: '10px'  }}>
        <input type="text" name="name"  style={{ width:"80%"}} value={formData.name} onChange={handleChange} placeholder="Name" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" name="quantity"  style={{ width:"80%"}} value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" name="unit" style={{ width:"80%"}} value={formData.unit} onChange={handleChange} placeholder="Unit" required />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" name="calories_per_unit" style={{ width:"80%"}} value={formData.calories_per_unit} onChange={handleChange} placeholder="Calories per Unit" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const MealCreationComponent = () => {
  const [createdMeal, setCreatedMeal] = useState(null);

  const handleMealSubmit = (meal) => {
    setCreatedMeal(meal);
  };

  return (
    <div>
      <MealForm onMealSubmit={handleMealSubmit} />
      {createdMeal && (
        <FoodItemForm />
      )}
    </div>
  );
};

export default MealCreationComponent;
