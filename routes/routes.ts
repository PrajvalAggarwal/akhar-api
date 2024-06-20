import express from 'express';
import { loginUser, verifyOTP, resendOTP, socialLogin, updateProfile } from '../controllers/user';
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "." + file.mimetype.split('/')[1]);
    }
})


const uploads = multer({ storage: storage })

router.get('/', (req, res) => {
    res.send("Server listening");
});

//Auth Routes

router.post('/user', loginUser);
router.post('/verify-otp', verifyOTP)
router.post('/resend-otp', resendOTP);
router.post('/social-login', socialLogin);

//User routes
router.put('/user', uploads.single('pic'), updateProfile)
// router.delete('/user', logout)



export default router;  