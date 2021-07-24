import 'dotenv/config';
import mongoose from 'mongoose';
import { User, Itinerary } from './models';
import { users, itineraries } from './mocks';

const seed = async () => {
  console.log('Seeding started...');
  await mongoose.connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userDocs = users.map(user => new User(user));

  await User.insertMany(userDocs);

  for (let user of userDocs) {
    await Itinerary.insertMany(itineraries.map(itin => {
      const itinWithUsers = {...itin, user_id: user._id, collaborators: [{user_id: user._id, name:  user.name }]};
      return new Itinerary(itinWithUsers);
    }));
  }

  await mongoose.connection.close();
}

seed()
  .then(() => console.log('Finished.'))
  .catch(err => console.log(err));
