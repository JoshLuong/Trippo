import express from 'express';
import { User } from 'database/models';

const router = express.Router();

router.get('/', async (req, res, _next) => {
    const user = await User.findById(req.query.userId).exec();
    
    console.log(user);
  
    res.status(200).send({
      user: user
    });
  });

export default router;
