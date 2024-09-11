const express = require('express');
const router = express.Router();
const trainingCenterController = require('../controllers/trainingCenterController');

router.post('/', trainingCenterController.createTrainingCenter);
router.get('/', trainingCenterController.getTrainingCenters);

module.exports = router;
