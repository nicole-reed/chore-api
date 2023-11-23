import express, { Request, Response, NextFunction } from 'express';
import { getApiKey } from './services/apiKey.service';
import { getUsers } from './handlers/getUsers';
import { getAdmins } from './handlers/getAdmins';
import { getChores } from './handlers/getChores';
import { getChoreLists } from './handlers/getChoreLists';

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

app.get('/users', getUsers);

app.get('/admins', getAdmins);

app.get('/choreLists', getChoreLists);

app.get('/chores', getChores);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});