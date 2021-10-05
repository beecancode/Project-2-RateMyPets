const express = require('express');
const router = express.Router();
const petsCtrl = require('../controllers/pets');
const isLoggedIn = require('../config/auth');

router.get('/', petsCtrl.index);
router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/:id', petsCtrl.show);
router.post('/', isLoggedIn, petsCtrl.create);

module.exports = router;