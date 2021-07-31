import express from 'express';
import { Itinerary, Activity } from 'database/models';

const router = express.Router();

router.get('/', async (req: any, res, _next) => {
  const { offset, limit, name } = req.query;
  const regex = new RegExp(name, 'i') // i for case insensitive
  const filter = { user_id: req.session.userId, name: { $regex: regex } };

  const [itineraries, count] = await Promise.all([
    Itinerary.find(filter, {}, { skip: Number(offset) || 0, limit: Number(limit) || 100 }),
    Itinerary.countDocuments(filter),
  ]);

  res.status(200).send({
    itineraries: itineraries.map(e => e.toObject()),
    count,
  });
});

router.get('/:id', async (req: any, res, _next) => {
  const { id } = req.params;

  const itinerary = await Itinerary.findOne({ _id: id, user_id: req.session.userId }); // TODO update to use session user id too

  res.status(200).send(itinerary);
});

router.post('/', (req: any, res, _next) => {
  const itinerary = new Itinerary({ ...req.body, user_id: req.session.userId, collaborators: [req.user, ...req.body.collaborators] });
  itinerary.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send("Invalid Itinerary")
    })
});

router.post('/new-activity', async (req: any, res, _next) => {
  const product = await Itinerary.findOne({ _id: req.body.itinerary_id });
  new Date(req.body.time);
  const activity = new Activity(req.body);
  product?.activities.push(activity);
  product?.save()
    .then(() => {
      res.send(activity._id);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).send("Invalid Activity")
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
    { ...req.body, collaborators: [req.user, ...req.body.collaborators] },
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

export default router;
