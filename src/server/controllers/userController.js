const User = require('../studyBoardModels');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {

  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({username: username}).exec();
      // if username is found, test against hashed password
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return next({
              log: 'Error at userController.verifyUser',
              status: 503,
              message: {err: 'Unable to compare passwords'}
            });
          }
          res.locals.verified = result;
          return next();
        });
        // incorrect username provided
      } else {
        res.locals.verified = false;
        return next();
      }
    } catch(err) {
      return next({
        log: 'Error at userController.verifyUser',
        status: 503,
        message: {err: 'Unable to retrieve data from MongoDB'}
      });
    }
  },

  createUser: async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({username: username}).exec();
      // if username is not found, create user
      if (!user) {
        // hash password
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            return next({
              log: 'Error at userController.createUser',
              status: 503,
              message: {err: 'Unable to hash password'}
            });
          }
          // store new user in database
          User.create({
            username: username,
            password: hash,
            categories: []
          });
        });
        res.locals.created = true;
      // username already exists, new user not created
      } else {
        res.locals.created = false;
      }
      return next();
    } catch(error) {
      return next({
        log: 'Error at userController.createUser',
        status: 503,
        message: {err: 'Unable to add new user to database'}
      });
    }
  }
};

module.exports = userController;