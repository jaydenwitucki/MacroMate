import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogAMeal.css';

const AddItem = () => {
    const navigate = useNavigate();

    const [newItem, setNewItem] = useState({
        itemName: '',
        itemDescription: '',
        servingType: 'Default Serving',
        servingUnit: {
            grams: false,
            milliliters: false,
        },
        protein: '',
        carb: '',
        fats: '',
        calories: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setNewItem({
                ...newItem,
                servingUnit: {
                    ...newItem.servingUnit,
                    [name]: checked,
                },
            });
        } else {
            setNewItem({
                ...newItem,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5001/api/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                console.log('Meal added successfully');

                navigate('/diary');
            } else {
                console.error('Failed to add meal:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    return (
        <div className='add-item-container'>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Item Name:
                    <input
                        type="text"
                        name="itemName"
                        value={newItem.itemName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Item Image:
                    <input
                        type="url"
                        name="itemDescription"
                        value={newItem.itemDescription}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Default Serving:
                    <select
                        name="servingType"
                        value={newItem.servingType}
                        onChange={handleInputChange}
                    >
                        <option value="Default Serving">Default Serving</option>
                        <option value="Custom Serving">Custom Serving</option>
                    </select>
                </label>
                <br />

                {/* Custom Serving box (conditionally rendered) */}
                {newItem.servingType === 'Custom Serving' && (
                    <div className="custom-serving-box">
                        <label>
                            Name of Serving:
                            <input
                                type="text"
                                name="servingName"
                                value={newItem.servingName}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                )}

                <br />
                {/* Content per Serving box */}
                <div className="serving-box">
                    <label>
                        Content per Serving:
                    </label>
                    <div className="checkbox-container">
                        <label>
                            <input
                                type="checkbox"
                                name="grams"
                                checked={newItem.servingUnit.grams}
                                onChange={handleInputChange}
                            />
                            grams
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="milliliters"
                                checked={newItem.servingUnit.milliliters}
                                onChange={handleInputChange}
                            />
                            milliliters
                        </label>
                    </div>
                </div>

                <br />
                <label>
                    Protein per Standard Serving:
                    <input
                        type="text"
                        name="protein"
                        value={newItem.protein}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Carb per Standard Serving:
                    <input
                        type="text"
                        name="carb"
                        value={newItem.carb}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Fats per Standard Serving:
                    <input
                        type="text"
                        name="fats"
                        value={newItem.fats}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Calories per Standard Serving:
                    <input
                        type="text"
                        name="calories"
                        value={newItem.calories}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
