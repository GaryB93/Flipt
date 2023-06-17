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
        const match = await bcrypt.compare(password, user.password);
        // if passwords match, save user id to be used as cookie
        if (match) {
          res.locals.userId = user._id;
        }
        res.locals.verified = match;
        return next();
      // incorrect username provided
      } else {
        res.locals.verified = false;
        return next();
      }
    } catch(err) {
      return next({
        log: 'Error at userController.verifyUser',
        status: 503,
        message: {err: 'Unable to verify user'}
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
        const hash = await bcrypt.hash(password, saltRounds);
        // new user document
        const newUser = new User({
          username: username,
          password: hash,
          categories: []
        });
        const doc = await newUser.save();
        // save user id to be used as cookie
        res.locals.userId = doc._id;
        res.locals.userCreated = true;
      // username already exists, new user not created
      } else {
        res.locals.userCreated = false;
      }
      return next();
    } catch(error) {
      return next({
        log: 'Error at userController.createUser',
        status: 503,
        message: {err: 'Unable to create user'}
      });
    }
  }
};

module.exports = userController;