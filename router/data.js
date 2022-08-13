const express = require('express');
const {create,getlist,updateData,removeData} = require('../controller/data');
const router = express.Router();
const {authenticate} = require('../middleware/jwt');

router.post('/Create',authenticate,create);
router.get('/getList',authenticate,getlist);
router.put('/update',authenticate,updateData);
router.delete('/remove',authenticate,removeData);

module.exports = router;