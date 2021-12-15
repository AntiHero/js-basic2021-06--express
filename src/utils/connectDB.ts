import mongoose from 'mongoose';

function connectDB(url: string) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

export default connectDB;
