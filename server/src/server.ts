import app from './app';
import env from './util/validateEnv';
import mongoose from 'mongoose';

const PORT = env.PORT || 5001;

mongoose
  .connect(env.MONGO_CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
      console.log(`The Server is running at ${PORT}`);
    });
  })
  .catch(console.error);
