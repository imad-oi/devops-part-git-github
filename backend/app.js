const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createProduct, findList, updateProduct, deleteProduct } = require('./src/controllers/product.controller');
const { registerUser, login } = require('./src/controllers/auth.controller');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

app.post("/auth/login", login);
app.post('/auth/register', registerUser)

app.post('/products', createProduct)
app.get('/products', findList)
app.put('/products', updateProduct)
app.delete('/products', deleteProduct)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
