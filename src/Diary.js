import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const Diary = () => {
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    // Fetch user-specific diary items from the backend
    const fetchUserDiaryItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/diary', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserItems(data);
        } else {
          console.error('Failed to fetch user diary items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user diary items:', error);
      }
    };

    fetchUserDiaryItems();
  }, []);

  const handleEdit = async (itemId, updatedData) => {
    try {
      const { _id, ...dataToSend } = updatedData;
      const response = await fetch(`http://localhost:5001/api/diary/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        // Update the userItems state with the edited data
        const updatedItems = userItems.map((item) =>
          item._id === itemId ? { ...item, ...dataToSend } : item
        );
        setUserItems(updatedItems);
      } else {
        console.error('Failed to edit diary item:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing diary item:', error);
    }
  };
  
  const handleDelete = async (itemId) => {
    try {
      // Make an API request to delete the diary item from the database
      const response = await fetch(`http://localhost:5001/api/diary/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Remove the deleted item from the userItems state
        const updatedItems = userItems.filter((item) => item._id !== itemId);
        setUserItems(updatedItems);
      } else {
        console.error('Failed to delete diary item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting diary item:', error);
    }
  };

  return (
    <div>
      <h2>Diary Page</h2>
      <Link to="/log-meal">
        <button>Add a New Item (Log Meal)</button>
      </Link>
      {userItems.map((item) => (
        <DiaryItem
          key={item._id}
          item={item}
          onEdit={(updatedData) => handleEdit(item._id, updatedData)}
          onDelete={() => handleDelete(item._id)}
        />
      ))}
    </div>
  );
};

export default Diary;
