import { useState, useEffect } from 'react';
import React from "react";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Card = ({ card, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(card.text);
    const [showColorOptions, setShowColorOptions] = useState(false);
    const [selectedColor, setSelectedColor] = useState(card.color);
    const [colors, setColors] = useState([]);

    const fetchColors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/getColors');
            setColors(response.data);

        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };

    useEffect(() => {
        fetchColors();
        console.log(colors);

    }, []);


    const styleCard = {
        backgroundColor: selectedColor,
        width: '100px',
        height: '160px',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        position: 'relative',
        margin: '10px'
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        onEdit({ ...card, color });
        setShowColorOptions(false);
    };

    const textEdit = () => {
        setIsEditing(!isEditing); // להחליף מצב עריכה
    };

    return (
        <div style={styleCard}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <button
                        onClick={() => {
                            onEdit({ ...card, text: editedText }); // שמירת הערך המעודכן
                            setIsEditing(false); // יציאה ממצב עריכה
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setEditedText(card.text); // חזרה לערך המקורי
                            setIsEditing(false); // יציאה ממצב עריכה
                        }}
                    >
                        Cancel
                    </button>
                </div>

            ) : (
                <h2>{editedText}</h2>
            )}

            <button onClick={textEdit} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <FaEdit />
            </button>

            <button
                onClick={() => setShowColorOptions(!showColorOptions)}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    backgroundColor: selectedColor,
                    borderRadius: '50%',
                    border: '1px solid white',
                    width: '22px',
                    height: '22px',
                    cursor: 'pointer'
                }}
            ></button>


            {showColorOptions && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute', // מיקום אבסולוטי
                    bottom: '0', // צמוד לתחתית הכרטיס
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    padding: '5px',
                    zIndex: '1'
                }}>
                    {colors.map(color => (
                        <div
                            key={color}
                            onClick={() => handleColorChange(color)}
                            style={{
                                marginRight: '5px',
                                display: 'flex',
                                backgroundColor: color,
                                borderRadius: '50%', // עיגול
                                width: '30px',
                                height: '30px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                        </div>
                    ))}
                </div>
            )}



            <button onClick={() => onDelete(card.id)} style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
            }}>
                <FaTrash />
            </button>
        </div>);
};

export default Card;