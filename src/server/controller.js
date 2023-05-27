const express = require('express');
const path = require('path');
const fs = require('fs');

// MAKE SURE TO ADD DONE FUNCTIONALITY TO CARDS

const dbController = {
  readDB: (req, res, next) => {
    fs.readFile(path.resolve(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        const err = {
          log: 'Error handler for dbController',
          status: 401,
          message: {err: 'Error reading database file'}
        };
        return next(err);
      }
      res.locals.db = JSON.parse(data);
      return next();
    });
  },

  addTopic: (req, res, next) => {
    const db = res.locals.db;
    const { newTopic } = req.body;
    const numOfTopics = Object.keys(db).length;

    // add new topic
    db[`topic${numOfTopics}`] = {
      topic: newTopic,
      answer: '',
      done: false
    };

    const data = JSON.stringify(db);

    fs.writeFile(path.resolve(__dirname, 'db.json'), data, (err) => {
      if (err) {
        const err = {
          log: 'Error handler for dbController',
          status: 401,
          message: {err: 'Error writing to database file'}
        };
        return next(err);
      }
    });
    res.locals.db = db;
    return next();
  },

  addAnswer: (req, res, next) => {
    // database object
    const db = res.locals.db;
    // topicId and answer received from client
    const { topicId, answer } = req.body;
    db[`topic${topicId}`].answer = answer;

    const data = JSON.stringify(db);

    fs.writeFile(path.resolve(__dirname, 'db.json'), data, (err) => {
      if (err) {
        const err = {
          log: 'Error handler for dbController',
          status: 401,
          message: {err: 'Error writing to database file'}
        };
        return next(err);
      }
    });
    res.locals.db = db;
    return next();
  }
};

module.exports = dbController