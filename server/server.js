
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;



const colors = ["#8e7cc3", "#00ff20", "#00ebff", "#ff009c"];

let cards = [
    { "id": 1, "text": "card1", "color": "#ff009c" },
    { "id": 2, "text": "card2", "color": "#00ff20" },
    { "id": 3, "text": "card3", "color": "#8e7cc3" }
]

app.get('/getColors', (req, res) => {
    res.json(colors);
});


app.get('/getAllCards', (req, res) => {
    res.json(cards);
});

app.get('/getCard/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const card = cards.find((card)=> card.id === id);
    if(!card){
        res.json("ERROR: card not faund");
    }
    res.json(card);
});

app.post('/addCard', (req, res) => {
    
    const id = cards[cards.length -1 ].id + 1 || 1;
    const color = colors[0];
    const text = '';
    cards.push({id, text, color});
    res.json("add card");
});

app.put('/updateCard/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = cards.findIndex((card) => card.id === id);

    if (index === -1) {
        return res.status(400).json("ERROR: card not found");
    }

    const { text, color } = req.body;

    if (!text || !color) {
        return res.status(401).json("ERROR: Missing fields");
    }

    cards[index] = { id, text, color };
    res.json("Card updated successfully");
});



app.delete('/deleteCard/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const lengthBeforeDelete = cards.length;
    cards = cards.filter((card)=> card.id !== id);
    if(lengthBeforeDelete - cards.length == 1)
        res.json("delete card");
    else
        res.json("not delete card")
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});