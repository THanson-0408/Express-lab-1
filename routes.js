"use strict";
const express = require("express");
const routes = express.Router();

const cartItems = [
  { id: 1, product: "Apples", price: 4.0, quantity: 35 },
  { id: 2, product: "bananas", price: 7.0, quantity: 20 },
  { id: 3, product: "blueberries", price: 9.0, quantity: 23 },
  { id: 4, product: "grapes", price: 2.0, quantity: 50 },
  { id: 5, product: "peachs", price: 6.0, quantity: 30 },
  { id: 6, product: "oranges", price: 5.0, quantity: 75 },
  { id: 7, product: "pomegranates", price: 8.0, quantity: 15 },
];

let nextId = 8;

// routes.get("/cartItems", (req, res) => {
//   const maxPrice = Number(req.query.maxPrice);
//   if (maxPrice) {
//     const lowPrice = cartItems.filter((item) => item.price >= maxPrice);
//     res.json(lowPrice);
//   } else {
//     res.json(cartItems);
//   }

//   res.status(200);
// });

routes.get("/cartItems", (req, res) => {
  if (req.query.maxPrice) {
    let filterArray = cartItems.filter((item) => {
      return item.price <= parseFloat(req.query.maxPrice);
    });
    res.status(200);
    res.json(filterArray);
  } else if (req.query.prefix) {
    let filterArray = cartItems.filter((item) => {
      let currentItem = item.product.toLowerCase();
      return currentItem.startsWith(req.query.prefix.toLowerCase());
    });
    res.status(200);
    res.json(filterArray);
  } else if (req.query.pageSize) {
    let pageSize = parseInt(req.query.pageSize);
    let results = cartItems.slice(0, pageSize);
    res.status(200);
    res.json(results);
  } else {
    res.status(200);
    res.json(cartItems);
  }
});

//------------------------------------------------------------------
routes.get("/cartItems/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = cartItems.find((item) => {
    return item.id === id;
  });
  if (item) {
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`No item found in cart with id: ${id}`);
  }
});

//------------------------------------------------------------------
routes.post("/cartItems", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);

  res.status(201);
  res.json(item);
});

//------------------------------------------------------------------
// routes.put("/cartItems/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const updatedItem = req.body;
//   if (cartItems["item" + id] != null) {
//     cartItems["item" + id] = updatedItem;
//   }
//   res.status(200);
//   res.json(updatedItem);
// });

// routes.put("/cartItems/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const item = req.body;
//   const index = cartItems.findIndex((index) => item.id === id);
//   if (index >= 1) {
//     cartItems.splice(index, 1);
//     cartItems.push(item);
//   }
//   res.status(200);
//   res.json(item);
// });

routes.put("/cartItems/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  cartItems[index] = req.body;
  cartItems[index].id = id;
  res.status(200);
  res.json(cartItems[index]);
});

//------------------------------------------------------------------
routes.delete("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  res.status(204);
  res.json(cartItems);
});

// export routes for use in server.js
module.exports = routes;
