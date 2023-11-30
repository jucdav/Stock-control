const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    name: "name",
    price: 120,
    image: "images/producto1.jpg",
    stock: 3
  },
  {
    id: 2,
    name: "name",
    price: 100,
    image: "images/producto2.jpg",
    stock: 2
  },
  {
    id: 3,
    name: "name",
    price: 116,
    image: "images/producto3.jpg",
    stock: 3
  },
  {
    id: 4,
    name: "name",
    price: 220,
    image: "images/producto4.jpg",
    stock: 3
  },
  {
    id: 5,
    name: "name",
    price: 118,
    image: "images/producto5.jpg",
    stock: 5
  },
  {
    id: 6,
    name: "name",
    price: 146,
    image: "images/producto6.jpg",
    stock: 1
  }
]

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.post('/api/pay', (req, res) => {
  const ids = req.body;
  const productsCopy = products.map(p => ({...p}));
  ids.forEach(id => {
    const product = productsCopy.find(p => p.id === id);
    if(product.stock > 0) {
      product.stock--;
    }
    else {
      throw("Sin stock");
    }
  });
  products = productsCopy
  res.send(products);
})

app.use("/", express.static("fe"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});