const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.static('dist'));
app.use(express.urlencoded({extended: true}));

const dataController = require('./controllers/dataController.js');
const userController = require('./controllers/userController.js');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.post('/login',
userController.verifyUser,
(req, res) => {
  res.status(200).json(res.locals.verified);
}
);

app.post('/createAccount',
userController.createUser,
(req, res) => {
  res.status(200).json(res.locals.created);
}
);

app.get('/user_data/:username', 
  dataController.getData,
  (req, res) => {
    res.status(200).json(res.locals.categories);
  }
);

app.patch('/update',
  dataController.updateCategories,
  (req, res) => {
    res.status(200).json(res.locals.categories);
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