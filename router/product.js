const express = require('express');
const router = express.Router();

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        category: 'Thể thao' ,
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg']
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 20,
        category: 'Công nghệ',
        images: ['img4.jpg', 'img5.jpg', 'img6.jpg']
    },
    {
        id: 3,
        name: 'Product 3',
        price: 300,
        quantity: 30,
        category: 'Giáo dục',
        images: ['img7.jpg', 'img8.jpg', 'img9.jpg']
    }
];

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.post("/", (req, res) => {
    const newProduct = {
        id: Date.now(), // Sử dụng timestamp để tạo id duy nhất
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        images: req.body.images
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index].name = req.body.name;
        products[index].price = req.body.price;
        products[index].quantity = req.body.quantity;
        products[index].category = req.body.category;
        products[index].images = req.body.images;
        res.send(products[index]);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.send({ message: 'Product deleted', id: id });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

module.exports = router;
