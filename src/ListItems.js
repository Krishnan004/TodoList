import React, { useState } from 'react';
import { FaTrashAlt, FaPencilAlt, FaClock } from "react-icons/fa";
import apiRequest from './apiRequest';

const ListItems = ({ item, handleCheck, handleDelete, setItems, setFetchError, API_URL }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedText !== item.value) {
      handleEditsubmit(item.id);
    }
  };

  const handleChange = (e) => {
    setEditedText(e.target.value)
  }

  const handleEditsubmit = async (id) => {
    const updateEditTime = new Date().toLocaleTimeString();
    const updatedItem = {
      ...item,
      value: editedText,
      editTime: updateEditTime
    };
    setItems(prevItems => {
      const updatedItems = prevItems.map(prevItem =>
        prevItem.id === item.id ? updatedItem : prevItem
      );
      return updatedItems;
    });

    
    const updateEditOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem) // Include all properties in the request body
    };

    try {
      const requrl = `${API_URL}/${id}`;
      const response = await apiRequest(requrl, updateEditOption);

      if (response instanceof Error) {
        throw new Error('Failed to update item status: ' + response.message);
      }
    } catch (error) {
      setFetchError(error.message);
    }

    setIsEditing(false);
    setEditedText('');
  };

  return (
    <li className="border-2 max-w-xs h-22 p-4 shadow-xl hover:rounded-xl hover:bg-gray-800 hover:transition duration-150 hover:text-white" key={item.id}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            autoFocus
            className="bg-gray-800 focus:outline-none"
          />
          <button
            onClick={() => handleEditsubmit(item.id)}
            className="border-2 rounded-xl text-white bg-blue-500 px-4 py-2 mt-2"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="">
            <input
              type="checkbox"
              onClick={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label
              className="m-8 text-2xl"
              style={item.checked ? { textDecoration: 'line-through' } : null}
            >
              {item.value}
            </label>
            <FaPencilAlt
              role="button"
              onClick={handleDoubleClick}
              className="float-right"
            />
            <FaTrashAlt
              className="mx-5 float-right text-2xl"
              role="button"
              onClick={() => handleDelete(item)}
            />
            <label className="flex text-s" htmlFor="addtime"><FaClock className="text-xl p-1 mr-2" />  {item.time}</label>
          </div>
        </>
      )}
    </li>
  );
};

export default ListItems;