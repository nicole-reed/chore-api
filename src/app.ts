import express, { Request, Response, NextFunction } from 'express';
import { getApiKey } from './services/apiKey.service';
import { getUsers } from './handlers/getUsers';
import { getAdmins } from './handlers/getAdmins';
import { getChores } from './handlers/getChores';
import { getChoreLists } from './handlers/getChoreLists';
import { getAdminById } from './handlers/getAdminById';
import { getUserById } from './handlers/getUserById';
import { getChoreById } from './handlers/getChoreById';
import { getChoreListById } from './handlers/getChoreListById';
import { createAdmin } from './handlers/createAdmin';
import bodyParser from 'body-parser';
import { createUser } from './handlers/createUser';
import { createChoreList } from './handlers/createChoreList';
import { createChore } from './handlers/createChore';
import { updateAdmin } from './handlers/updateAdmin';
import { updateUser } from './handlers/updateUser';
import { updateChoreList } from './handlers/updateChoreList';
import { updateChore } from './handlers/updateChore';
import { deleteAdmin } from './handlers/deleteAdmin';
import { deleteUser } from './handlers/deleteUser';
import { deleteChore } from './handlers/deleteChore';
import { deleteChoreList } from './handlers/deleteChoreList';

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
app.use(bodyParser.json());

app.get('/', (req, res) => {

  res.send('hello universe')
});

app.get('/users', getUsers);

app.get('/admins', getAdmins);

app.get('/chorelists', getChoreLists);

app.get('/chores', getChores);

app.get('/admins/:admin_id', getAdminById);

app.get('/users/:user_id', getUserById);

app.get('/chores/:chore_id', getChoreById);

app.get('/chorelists/:chore_list_id', getChoreListById);

app.post('/admins', createAdmin);

app.post('/users', createUser);

app.post('/chorelists', createChoreList);

app.post('/chores', createChore);

app.put('/admins/:admin_id', updateAdmin);

app.put('/users/:user_id', updateUser);

app.put('/chorelists/:chore_list_id', updateChoreList);

app.put('/chores/:chore_id', updateChore);

app.delete('/admins/:admin_id', deleteAdmin);

app.delete('/users/:user_id', deleteUser);

app.delete('/chores/:chore_id', deleteChore);

app.delete('/chorelists/:chore_list_id', deleteChoreList);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});