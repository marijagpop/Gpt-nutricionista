import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import { jsPDF } from 'jspdf';

const DietPlanGenerator = () => {
    const [formData, setFormData] = useState({
        user_id: '1',
        period: '7',
        preferences: 'vegetarian',
        total_calories: '3000'
    });
    const [dietPlan, setDietPlan] = useState(null);
    const [rawDietPlan, setRawDietPlan] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatDietPlan = (plan) => {
        return plan.split('\n').map((line, index) => line ? <p key={index}>{line}</p> : null);
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10); // Smanjite veličinu slova
        const lines = rawDietPlan.split('\n');
        let y = 10; // Početna vertikalna pozicija
        lines.forEach((line, index) => {
            if (y > 280) { // Pređite na novu stranicu ako je Y veća od 280
                doc.addPage();
                y = 10; // Resetujte Y poziciju za novu stranicu
            }
            doc.text(line, 10, y);
            y += 10; // Inkrement za sledeću liniju
        });
        doc.save('diet-plan.pdf');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/dietPlans/kreirajPlanGPT', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRawDietPlan(response.data.choices[0].message.content); // Čuvanje sirovog plana za PDF
            const formattedPlan = formatDietPlan(response.data.choices[0].message.content);
            setDietPlan(formattedPlan);
        } catch (error) {
            console.error('Došlo je do greške prilikom generisanja plana ishrane', error);
        }
    }
    

    return (
        <div className="diet-plan-generator">
            <h1>Kreiraj svoj plan ishrane</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    name="period"
                    placeholder="Period (days)"
                    value={formData.period}
                    onChange={handleChange}
                />
                <InputField
                    name="preferences"
                    placeholder="Preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                />
                <InputField
                    name="total_calories"
                    placeholder="Total Calories"
                    value={formData.total_calories}
                    onChange={handleChange}
                />
                <button type="submit">Generate Diet Plan</button>
            </form>

            {dietPlan && (
                <div className="diet-plan">
                    <div>{dietPlan}</div>
                    <button onClick={handlePDFDownload}>Download PDF</button>
                </div>
            )}
        </div>
    );
}

export default DietPlanGenerator;
