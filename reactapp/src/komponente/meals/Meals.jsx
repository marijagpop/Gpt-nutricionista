import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MealRow from './MealRow';  
import ReactPaginate from 'react-paginate';
import useMeals from './useMeals';

const palette = {
  primary: '#c9c9ee',
  secondary: '#baabbd',
  tertiary: '#9f838c',
  quaternary: '#8d7471',
  quinary: '#816f68',
};

const Meals = () => {
  const navigate = useNavigate();
  const meals = useMeals();
  const [currentPage, setCurrentPage] = useState(0);
  const mealsPerPage = 5; // Broj obroka po stranici
  const pageCount = Math.ceil(meals.length / mealsPerPage);
  const [currentMeals, setCurrentMeals] = useState(meals);
 
  useEffect(() => {
    setCurrentMeals(meals.slice(0, mealsPerPage)); // Inicijalizujemo currentMeals kada se meals učitaju
  }, [meals]);
    
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleCategoryChange = (category) => {
    if (category == "" || category === "") {
      setCurrentMeals(meals);
    } else {
      const filteredMeals = meals.filter((meal) => meal.time_of_day === category);
      setCurrentMeals(filteredMeals);
    }
    setCurrentPage(0); // Resetujemo stranicu na prvu kada se menja kategorija
  };

  const handleDeleteMeal = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/meals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       
      const updatedMeals = currentMeals.filter(meal => meal.id !== id);
      setCurrentMeals(updatedMeals);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };
  

  const offset = currentPage * mealsPerPage;
  const currentMealsPaginated = currentMeals.slice(offset, offset + mealsPerPage);

  return (
    <div className="meals-container" style={{ backgroundColor: palette.primary }}>
      <h1 style={{ color: palette.quaternary }}>Obroci</h1>
      <div className="select-container">
        <label className="select-label">Kategorija:</label>
        <div className="select-wrapper"> 
          <select
            className="select"
            onChange={(e) => handleCategoryChange(e.target.value)}
            defaultValue=""
          >
            <option value="">Sve</option>
            <option value="dorucak">Doručak</option>
            <option value="rucak">Ručak</option>
            <option value="vecera">Večera</option>
            <option value="uzina">Užina</option>
          </select>
        </div>
      </div>
      <table className="meals-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Opis</th>
            <th>Vreme obroka</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentMealsPaginated.map((meal) => (
            <MealRow
              key={meal.id}
              meal={meal}
              onDetailsClick={() => navigate(`/meals/${meal.id}`)}
              onDelete={() => handleDeleteMeal(meal.id)}  
            />
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"
      />
    </div>
  );
};

export default Meals;
