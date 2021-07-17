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
    })
});

router.delete('/deleteItinerary', async (_req, res, _next) => {
  try {
    await Itinerary.deleteOne({}), async () => {
        await Itinerary.find({});
        res.send("deleted itinerary");
    }
  } catch (err) {
    res.send(err)
  }
});

export default router;
