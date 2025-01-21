 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DietPlanGenerator from './komponente/gpt/DietPlanGenerator';
import Meals from './komponente/meals/Meals';
import Detalji from './komponente/meals/detalji/Detalji';
import Navbar from './komponente/Navbar';
import Login from './komponente/Auth/Login';
import Register from './komponente/Auth/Register';
import { useState } from 'react';
import CaloriesBurnedComponent from './komponente/pocetna/CaloriesBurnedComponent';
import MealCreationComponent from './komponente/meals/dodaj/MealCreationComponent';
import AdminDashboard from './komponente/Admin/Admin';

function App() {
  const [token,setToken]=useState(null);
  return (
    <div className="App">
      <BrowserRouter>
         <Navbar token={token} setToken={setToken}></Navbar> 
        <Routes>
          <Route path="/gptMealPlan" element={<DietPlanGenerator></DietPlanGenerator>}></Route>  
          <Route path="/meals/:id" element={<Detalji></Detalji>}></Route>
          <Route path="/meals" element={<Meals></Meals>}></Route>
          <Route path="/login" element={<Login setToken={setToken}></Login>}></Route> 
          <Route path="/register" element={<Register setToken={setToken}> </Register>}></Route> 



          <Route path="/" element={<CaloriesBurnedComponent></CaloriesBurnedComponent>}></Route>
          <Route path="/dodaj" element={<MealCreationComponent></MealCreationComponent>}></Route>

          <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
