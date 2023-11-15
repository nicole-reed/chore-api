import express, { Request, Response, NextFunction } from 'express';
import { getApiKey } from './services/apiKey.service';
import { getAdmins } from './services/admins.service';
import { getUsers } from './services/users.service';
import { getChoreLists } from './services/choreLists.service';
import { getChores } from './services/chores.service';

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

app.get('/admins', async (req, res) => {
  try {
    const admins = await getAdmins()
    res.status(200).json({ admins })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.get('/choreLists', async (req, res) => {
  try {
    const choreLists = await getChoreLists()
    res.status(200).json({ choreLists })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.get('/chores', async (req, res) => {
  try {
    const chores = await getChores()
    res.status(200).json({ chores })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});