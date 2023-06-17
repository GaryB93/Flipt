const express = require('express');
const User = require('../studyBoardModels');

const dataController = {
  
  getData: async (req, res, next) => {
    const userId = req.cookies.ssid;
    if (!userId) {
      res.locals.categories = false;
      return next();
    }
    try {
      const user = await User.findOne({_id: userId}).exec();
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
    const { categories } = req.body;
    const userId = req.cookies.ssid;
    
    try {
      const user = await User.findOneAndUpdate(
        {_id: userId},
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