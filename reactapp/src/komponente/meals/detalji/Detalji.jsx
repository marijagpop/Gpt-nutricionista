 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FoodItem from './FoodItem';

const Detalji = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sorted, setSorted] = useState(false); 

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/meals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMeal(response.data.data);
            } catch (error) {
                console.error('Greška pri dobijanju detalja obroka:', error);
            }
        };
    
        fetchMeal();
    }, [id]);
    

    if (!meal) {
        return <div>Učitavanje...</div>;
    }

    const filteredFoodItems = meal.food_items
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sorted) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

    const toggleSort = () => {
        setSorted(!sorted);  
    };

    const handleFoodItemUpdate = (updatedItem) => {
        setMeal({
            ...meal,
            food_items: meal.food_items.map(item => {
                if (item.id === updatedItem.id) {
                    return updatedItem;
                }
                return item;
            })
        });
    };

    return (
        <div className="meal-details-container">
            <h1>{meal.name}</h1>
            <p><strong>Opis:</strong> {meal.description}</p>
            <p><strong>Vreme obroka:</strong> {meal.time_of_day}</p>
            <p><strong>Kalorije:</strong> {meal.calories}</p>
            <p><strong>Proteini:</strong> {meal.proteins} g</p>
            <p><strong>Ugljeni hidrati:</strong> {meal.carbs} g</p>
            <p><strong>Masti:</strong> {meal.fats} g</p>

            <div className="search-box">
                <label>Pretraži sastojke:</label>
                <input
                    type="text"
                    placeholder="Unesite naziv sastojka"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={toggleSort}>
                    {sorted ? 'Sortiraj silazno' : 'Sortiraj uzlazno'}
                </button>
            </div>

            <div className="food-items">
                <h2>Sastojci</h2>
                {filteredFoodItems.map((item) => (
                    <FoodItem key={item.id} item={item} onUpdate={handleFoodItemUpdate} />
                ))}
            </div>
        </div>
    );
};

export default Detalji;
