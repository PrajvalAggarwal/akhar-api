import express from 'express';
import {loginUser,verifyOTP,resendOTP} from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Serrver listening");
});

router.post('/user',loginUser);
router.post('/verify-otp',verifyOTP)
router.post('/resend-otp',resendOTP);


export default router;  