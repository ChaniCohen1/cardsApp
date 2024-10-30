import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from "./Card";


const Cards = () => {

    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/getAllCards');
            console.log("Fetched cards:", response.data);
            setCards(response.data);

        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    useEffect(() => {
        console.log(cards, "&&&&&&&&&&&&&&");
    }, [cards]);

    const addCard = async () => {
        try {
            console.log("addCard");
            
            const response = await axios.post('http://127.0.0.1:5000/addCard');

            if (response.status === 200) {
                console.log("Card added successfully");
                fetchCards();
            } else {
                console.log("Failed to add card");
            }
        }
        catch (error) {
            console.error("Error adding card:", error);
        }
    };

    const deleteCard = async (id) => {
        try {
            console.log("delete", id);

            const response = await axios.delete(`http://127.0.0.1:5000/deleteCard/${id}`);

            if (response.status === 200) {
                console.log("Card deleted successfully");
                fetchCards();
            } else {
                console.log("Failed to delete card");
            }
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const updateCard = async (card) => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/updateCard/${card.id}`, {
                text: card.text,
                color: card.color
            });

            if (response.status === 200) {
                console.log("Card updated successfully");

                fetchCards();
            } else {
                console.log("Failed to update card");
            }
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };


    return (
        <div>
            <h1>Cards List</h1>
            <div style={{ display: 'flex' }}>
                {cards.map((card) => (
                    <Card key={card.id} card={card} onDelete={deleteCard} onEdit={updateCard} />
                ))}

            </div>
            <button style={{border: 'none'}} onClick={addCard}>+</button>
        </div>
    )
};

export default Cards;