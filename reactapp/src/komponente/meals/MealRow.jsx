import React from 'react';

const MealRow = ({ meal, onDetailsClick, onDelete }) => {
  return (
    <tr key={meal.id}>
      <td>{meal.name}</td>
      <td>{meal.description}</td>
      <td>{meal.time_of_day}</td>
      <td>
        <button onClick={onDetailsClick}>Detalji</button>
        <button onClick={() => onDelete(meal.id)}>Obriši</button>  
      </td>
    </tr>
  );
};

export default MealRow;
