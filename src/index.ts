import express from 'express';
import { resolve } from 'path';

const PORT = 3000;

const app = express();

app.use(express.static('public'));

app.get('*/style.css', (req, res) => {
  res.status(200).sendFile(resolve(__dirname, '../public/style.css'));
})

app.get('*', (req, res) => {
  res.status(404).sendFile(resolve(__dirname, '../public/404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
