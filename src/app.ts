import express, { Request, Response, NextFunction } from 'express';
import { getApiKey } from './services/apiKey.service';
import { getCars } from './services/cars.service';

const port = Number(process.env.PORT) || 8080;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = await getApiKey()
    const passedInApiKey = req.headers['x-api-key']
    if (!passedInApiKey) {
      res.status(401).send()
    } else if (passedInApiKey !== apiKey) {
      res.status(403).send()
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }

}

const app = express();
app.use(authMiddleware);

app.get('/', (req, res) => {

  res.send('hello universe')
});

app.get('/cars', async (req, res) => {
  try {
    const cars = await getCars()
    res.status(200).json({ cars })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});