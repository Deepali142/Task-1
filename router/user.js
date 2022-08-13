const express = require('express');
const {register,login} = require('../controller/user');
const router = express.Router();

router.post('/Register',register);
router.post('/Login',login);

module.exports = router;