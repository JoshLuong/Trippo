import express from 'express';
import { Itinerary } from 'database/models';

const router = express.Router();

router.get('/', async (req: any, res, _next) => {
  const { offset, limit, name } = req.query;
  const regex = new RegExp(name, 'i') // i for case insensitive
  const filter = {user_id: req.session.userId, name:  {$regex: regex}};

  const [itineraries, count] = await Promise.all([
    Itinerary.find(filter, {}, { skip: Number(offset) || 0, limit: Number(limit) || 100 }),
    Itinerary.countDocuments(filter),
  ]);

  res.status(200).send({
    itineraries: itineraries.map(e => e.toObject()),
    count,
  });
});

router.post('/', (req: any, res, _next) => {
  const itinerary = new Itinerary({ ...req.body, user_id: req.session.userId, collaborators: [req.user, ...req.body.collaborators]});
  itinerary.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send("Invalid Itinerary")
    })
});

router.delete('/:id', (req: any, res, _next) => {
  console.log(req.user);
  Itinerary.findOneAndRemove({ _id: req.params.id, user_id: req.session.userId })
    .then(doc => {
      res.send(doc);
    }).catch(err => {
      console.error(err);
      res.status(404).send('Card with the given id does not exist');
    });
});

router.patch('/:id', async (req: any, res) => {
  const product = await Itinerary.findOneAndUpdate({ _id: req.params.id, user_id: req.session.userId },
    {...req.body}, 
   {new: true,
    runValidators: true
  }
  );

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

export default router;
