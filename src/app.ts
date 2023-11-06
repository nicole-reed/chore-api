import express from 'express';

const port = Number(process.env.PORT) || 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('hello universe')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});