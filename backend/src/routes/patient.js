const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const patientController = require('../controllers/patientController');

router.get('/dashboard', auth, patientController.getDashboard);
router.post('/log', auth, patientController.logActivity);
router.get('/goals', auth, patientController.getGoals);
router.put('/goals', auth, patientController.updateGoals);

module.exports = router;
