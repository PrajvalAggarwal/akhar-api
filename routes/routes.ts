import express from 'express';
import {loginUser} from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Serrver listening");
});

router.post('/user',loginUser);


export default router;  