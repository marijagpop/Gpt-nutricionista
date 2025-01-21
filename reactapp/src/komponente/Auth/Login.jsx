import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken}) => {
  const [email, setUsername] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  let navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      console.log(response.data);
      sessionStorage.setItem("token",response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      setToken(response.data.token)
      if(response.data.user.admin==0){
        navigate("/meals")
      }else{
        navigate("/admin")

      }
     
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="diet-plan-generator">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Korisničko ime"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          required
        />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Login;
