const express = require('express');
const router = express.Router();

const carts = [
    {
        id: 1,
        user: 'user1',
        total: 300,
        date: new Date().toISOString(),
        products: [
            { id: 1, name: 'Product 1', quantity: 2, price: 100 },
            { id: 2, name: 'Product 2', quantity: 1, price: 200 }
        ]
    },
    {
        id: 2,
        user: 'user2',
        total: 600,
        date: new Date().toISOString(),
        products: [
            { id: 3, name: 'Product 3', quantity: 2, price: 300 }
        ]
    }
];

router.get("/", (req, res) => {
    res.json(carts);
});

router.get("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const cart = carts.find(c => c.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


router.post("/", (req, res) => {
    const newCart = {
        id: Date.now(),
        user: req.body.user,
        total: req.body.total,
        date: new Date().toISOString(),
        products: req.body.products
    };
    carts.push(newCart);
    res.status(201).send(newCart);
});

router.put("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts[index].user = req.body.user;
        carts[index].total = req.body.total;
        carts[index].date = new Date().toISOString();
        carts[index].products = req.body.products;
        res.send(carts[index]);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


router.delete("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts.splice(index, 1);
        res.send({ message: 'Cart deleted', cartId: cartId });
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});

module.exports = router;
