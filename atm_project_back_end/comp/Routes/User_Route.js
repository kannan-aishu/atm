const express = require('express');
const {created_User,Get_Users, Withdrawal_Amount,Deposit_Amout,Get_ParticularUsers,delete_User}= require('../Conroller/User_Conroller');

const router = express.Router();
router.post('/create_users',created_User);
router.get('/get_users',Get_Users);
router.post('/withdrawal',Withdrawal_Amount)
router.post('/deposit',Deposit_Amout)
router.post('/Get_ParticularUsers',Get_ParticularUsers)
router.post('/delete',delete_User);
module.exports = router;
