const express = require('express');
const router = express.Router();

const {emailPassLoginController} = require('../controllres/login/loginController');
const { resetPasswordController } = require('../controllres/resetpass/resetPasswordController');
const refreshTokenController = require('../controllres/refreshToken/refreshTokenController');
const { logoutController } = require('../controllres/logout/logoutController');
const {emailPassSingupController} = require('../controllres/signup/signupController')

router.post('/login', emailPassLoginController)
router.post('/signup', emailPassSingupController)
router.post('/resetpassword', resetPasswordController)
router.get('/refresh', refreshTokenController)
router.get('/logout', logoutController)


module.exports = router