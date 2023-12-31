const express = require('express');
const router = express.Router();
const {registrationController} = require('../controllres/register/registerController');

router.post('/',registrationController)

module.exports = router