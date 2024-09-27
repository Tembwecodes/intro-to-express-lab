const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
//---------------------------------
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//-------------------------------------
app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});


//--------------------------------------
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!.`);
  });

//--------------------------------------
  app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
  

    if (isNaN(number)) {
      res.send('You must specify a number.');
    } else {

      const randomNumber = Math.floor(Math.random() * (number + 1));
      res.send(`You rolled a ${randomNumber}.`);
    }
  });

//---------------------------------------
  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
  
    
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      res.send('This item is not yet in stock. Check back soon!.');
    } else {
    
      const collectible = collectibles[index];
      res.json(collectible);
    }
  });

  //--------------------------------------
  app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
  
    if (req.query['min-price']) {
      const minPrice = parseFloat(req.query['min-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  
    if (req.query['max-price']) {
      const maxPrice = parseFloat(req.query['max-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  
    if (req.query.type) {
      const type = req.query.type;
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
  
    res.json(filteredShoes);
  });

//-------------------------------------
app.listen(3000, () => {
   console.log('Express is listening on port 3000');
})








