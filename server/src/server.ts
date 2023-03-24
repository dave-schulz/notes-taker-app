import express from 'express';

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`The Server is running at ${PORT}`);
});
