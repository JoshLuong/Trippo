import express from 'express';
import { Activity } from 'database/models';

const router = express.Router();

router.get('/', async (_req, res, _next) => {
  const activities = await Activity.find({});
  res.status(200).send(activities.map(e => e.toObject()));
});

export default router;
