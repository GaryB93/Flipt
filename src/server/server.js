const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbController = require('./controller.js');

app.get('/topics',
  dbController.readDB,
  (req, res) => {
    res.status(200).json(res.locals.db);
  }
);

app.post('/addtopic',
  dbController.readDB,
  dbController.addTopic,
  (req, res) => {
    res.status(200).json(res.locals.db);
  }
);

app.post('/answer',
  dbController.readDB,
  dbController.addAnswer,
  (req, res) => {
    res.status(200).json(res.locals.db);
  }
);

app.post('/status',
  dbController.readDB,
  dbController.changeStatus,
  (req, res) => {
    res.status(200).json(res.locals.db);
  }
);

app.use((req, res) => {
  res.status(404).send('Cannot find page!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Global error handler caught error',
      status: 500,
      message: {err: 'Caught global error handler'}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message.err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});