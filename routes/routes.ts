import express from 'express';
import {loginUser,verifyOTP} from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Serrver listening");
});

router.post('/user',loginUser);
router.post('/verify-otp',verifyOTP)


export default router;  