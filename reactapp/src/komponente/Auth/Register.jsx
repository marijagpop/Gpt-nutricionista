import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'novi',
    email: 'novi@example.com',
    password: 'password',
    age: '10',
    gender: 'male',
    weight: '85',
    height: '165',
    activity_level: 'very_active',
    dietary_restrictions: '',
  });
let navigate= useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data);
      alert("USPESNO!")
      navigate('/login')
      
    } catch (error) {
      console.error('Error during registration:', error);
      alert("GRESKA!")
    }
  };

  return (
    <div className="diet-plan-generator">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ime"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Lozinka"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Godine"
          required
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Pol"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Težina"
          required
        />
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Visina"
          required
        />
        <input
          type="text"
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          placeholder="Nivo aktivnosti"
          required
        />
        <input
          type="text"
          name="dietary_restrictions"
          value={formData.dietary_restrictions}
          onChange={handleChange}
          placeholder="Dijetetska ograničenja"
        />
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Register;
