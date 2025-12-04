const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/tips', publicController.getTips);
router.get('/tip/today', publicController.getTodayTip);

module.exports = router;
