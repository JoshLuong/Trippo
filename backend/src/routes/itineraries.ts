import express from 'express';
import { Itinerary } from 'database/models';

const router = express.Router();

router.get('/', async (req, res, _next) => {
  const { offset, limit } = req.query;
  const filter = {};

  const [itineraries, count] = await Promise.all([
    Itinerary.find(filter, {}, { skip: Number(offset) || 0, limit: Number(limit) || 100 }),
    Itinerary.countDocuments(filter),
  ]);

  res.status(200).send({
    itineraries: itineraries.map(e => e.toObject()),
    count,
  });
});

router.post('/', (req, res, _next) => {
  const itinerary = new Itinerary({...req.body});
  itinerary.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send("Invalid Itinerary")
    })
});

export default router;
