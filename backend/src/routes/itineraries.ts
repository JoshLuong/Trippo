import express from 'express';
import { Itinerary } from 'database/models';

const router = express.Router();

router.get('/', async (_req, res, _next) => {
  const itineraries = await Itinerary.find({});
  res.status(200).send(itineraries.map(e => e.toObject()));
});

router.post('/', (req, res, next) => {
  const itinerary = new Itinerary({...req.body});
  itinerary.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    })
});

export default router;
