const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;


app.use(express.json());
// serve static files
app.use(express.static('dist', { index: false}));
//
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// controllers to read and update database
const dataController = require('./controllers/dataController.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');

// app.get("/", function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../../dist', 'index.html')), (err) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   };
// });

app.post('/login',
userController.verifyUser,
cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals.verified);
  }
);

app.post('/createAccount',
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals.userCreated);
  }
);

app.get('/userData',
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

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html')), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  };
});

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