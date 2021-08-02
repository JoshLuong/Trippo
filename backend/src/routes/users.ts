import express from 'express';
import { User } from 'database/models';

const router = express.Router();

router.get('/:email', async (req, res, _next) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("User does not exist");
  }
});

export default router;
