import React, { useState, useEffect } from 'react';


import './DiaryItem.css'

const DiaryItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(item ? { ...item } : {});

  useEffect(() => {
    // Reset editedData when the item prop changes
    setEditedData(item ? { ...item } : {});
  }, [item]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      itemName: editedData.itemName,
      itemDescription: editedData.itemDescription,
      servingType: editedData.servingType,
      servingUnit: { grams: true, milliliters: false }, // Adjust this line as needed
      protein: editedData.protein,
      carb: editedData.carb,
      fats: editedData.fats,
      calories: editedData.calories,
      // Add other fields as needed
    };
    
    onEdit(item._id.toString(), updatedData);
    setIsEditing(false);
  };
  
  

  const handleDeleteClick = () => {
    onDelete(item._id);
  };

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value);
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="diary-container">

    <div className="diary-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="itemName"
            value={editedData.itemName || ''}
            onChange={handleInputChange}
          />
          {/* Include other input fields for description, protein, carb, fats, calories */}
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          {item && (
            <>
              <img src={item.itemDescription} alt={item.itemName} />
              <h3>{item.itemName}</h3>
              <h3>Protein: {item.protein}</h3>
              <h3>Carbs: {item.carb}</h3>
              <h3>Fats: {item.fats}</h3>
              <h3>Calories: {item.calories}</h3>
              <button onClick={handleDeleteClick}>Delete</button>
              
            </>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default DiaryItem;
