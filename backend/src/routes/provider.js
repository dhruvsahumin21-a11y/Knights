const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const providerController = require('../controllers/providerController');

router.get('/patients', auth, requireRole('provider'), providerController.getPatients);
router.get('/patient/:id/compliance', auth, requireRole('provider'), providerController.getPatientCompliance);
router.post('/patient/:id/reminder', auth, requireRole('provider'), providerController.createReminder);

module.exports = router;
