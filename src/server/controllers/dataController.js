const express = require('express');
const User = require('../studyBoardModels');

const dataController = {
  
  getData: async (req, res, next) => {
    const username = req.params.username;
    try {
      const user = await User.findOne({username: username}).exec();
      res.locals.categories = user.categories;
      return next();
    } catch (err) {
      return next({
        log: 'Error at dataController.getData',
        status: 503,
        message: {err: 'Unable to retrieve data from MongoDB'}
      });
    }
  },

  updateCategories: async (req, res, next) => {
    const { username, categories } = req.body;

    try {
      const user = await User.findOneAndUpdate(
        {username: username}, 
        {categories: categories}, 
        {returnDocument: 'after'}
      ).exec();
      res.locals.categories = user.categories;
      return next();
    } catch (err) {
      return next({
        log: 'Error handler for dataController',
        status: 503,
        message: {err: 'Error updating categories'}
      });
    }
  },
};

module.exports = dataController;