import express from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const getNextId = () => Number(_.uniqueId());

const state = {
  taskList: [],
  users: [{name: 'qwe', password: 'qwe', id: 1}],
};

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('<h2>Привет Express!</h2>');
});

app.get('/api/tasks', (req, res) => {
  res.json(state.taskList);
});

app.post('/api/task', (req, res) => {
  const { text } = req.body;
  const note = { id: getNextId(), text, isDone: false };
  state.taskList = [note, ...state.taskList];
  res.status(201).json(note).end();
});

app.delete('/api/task/:id', (req, res) => {
  const id = Number(req.params.id);
  state.taskList = state.taskList.filter((item) => item.id !== id);
  res.status(201).json({ id }).end();
});

app.patch('/api/task/:id', (req, res) => {
  const { text, isDone } = req.body;
  console.log('isDone: ', isDone);
  const id = Number(req.params.id);
  state.taskList = state.taskList.map((item) => {
    if (item.id !== id) return item;
    return {...item, text, isDone}
  });
  res.status(201).json({ id }).end();
});

app.post('/api/users', (req, res) => {
  console.log('user');
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`server started at ${port} port`);
});
