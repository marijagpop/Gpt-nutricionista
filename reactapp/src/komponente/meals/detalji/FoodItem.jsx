 
import React, { useState } from 'react';
import axios from 'axios';

const FoodItem = ({ item, onUpdate }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/foodItems/${editedItem.id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(editedItem); // Obaveštavamo roditelja da je sastojak ažuriran
    } catch (error) {
      console.error('Greška pri ažuriranju sastojka:', error);
    }
  };
  

  return (
    <div className="food-item">
      <input type="text" name="name" value={editedItem.name} onChange={handleChange} />
      <input type="text" name="quantity" value={editedItem.quantity} onChange={handleChange} />
      <input type="text" name="unit" value={editedItem.unit} onChange={handleChange} />
      <input type="text" name="calories_per_unit" value={editedItem.calories_per_unit} onChange={handleChange} />
      <button onClick={handleUpdate}>Ažuriraj</button>
    </div>
  );
};

export default FoodItem;
