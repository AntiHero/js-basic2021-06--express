import app from './index';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB';

dotenv.config();

const url = process.env.MONGODB_URI as string;

console.log('connecting to', url);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB(url);
  console.log(`Server is listening at http://localhost:${PORT}`);
});
