const express = require('express');
const services = require("./services");
const router = express.Router();


router.get('/items', services.getItems);

router.get('/items/:id', services.getItem);

module.exports = router;