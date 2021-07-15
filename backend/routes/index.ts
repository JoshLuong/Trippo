import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.status(200).send('Hello world');
});

export default router;
