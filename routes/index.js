const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/home/home');


router.get('/', ctrl.index);

module.exports = router;
