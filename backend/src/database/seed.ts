import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity } from './models';
import { activities } from './mocks';

const seed = async () => {
  console.log('Seeding started...');
  await mongoose.connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Activity.insertMany(activities.map(activity => {
    return new Activity(activity);
  }));

  await mongoose.connection.close();
}

seed()
  .then(() => console.log('Finished.'))
  .catch(err => console.log(err));
