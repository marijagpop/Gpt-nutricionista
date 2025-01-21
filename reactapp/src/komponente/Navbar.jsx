import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({token,setToken}) => {
 
  let navigate=useNavigate();
  const handleLogout = async () => {
    let token=  sessionStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });  
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setToken(null)
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="navbar">
      {token ? ( // Ako postoji token, prikaži linkove za obroke i planiranje obroka
        <>
          <NavLink to="/dodaj" activeClassName="active">Dodaj obrok</NavLink>
           
          <NavLink to="/meals" activeClassName="active">Obroci</NavLink>
          <NavLink to="/gptMealPlan" activeClassName="active">Planiranje obroka</NavLink>
          <button onClick={handleLogout}>Odjavi se</button>
        </>
      ) : ( // Ako ne postoji token, prikaži linkove za početnu, prijavu i registraciju
        <>
          <NavLink to="/" activeClassName="active" exact>Početna</NavLink>
          <NavLink to="/login" activeClassName="active">Prijava</NavLink>
          <NavLink to="/register" activeClassName="active">Registracija</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
