const  Router  = require("express").Router();
const products = require('../modules/products');
// const item = require('../models/item')

// git all products
Router.get('/products', async (req, res) => {
    const data = await products.find();
    res.json(data)
})

Router.get('/products/:id', async (req, res) => {
  const productitem = await products.find(req.params)
  res.json(productitem)
})

module.exports =Router;