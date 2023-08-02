const User = require('../studyBoardModels');

const cookieController = {
  setSSIDCookie: (req, res, next) => {
    if (res.locals.userCreated || res.locals.verified) {
      const userId = res.locals.userId;
      res.cookie('ssid', userId, {httpOnly: true});
    }
    return next();
  },

  verifyCookie: async (req, res, next) => {
    res.locals.verified = false;
    try {
      if (req.cookies.ssid) {
        const user = await User.findOne({id: req.cookies.ssid}).exec();
        res.locals.verified = user ? true : false;
      }
      return next();
    } catch(err) {
      return next({
        log: 'Error at cookieController.verifyCookie',
        status: 503,
        message: {err: 'Unable to verify cookie'}
      });
    }
  }, 

  removeCookie: (req, res, next) => {
    res.cookie('ssid', null, {httpOnly:true});
    return next();
  }
}

module.exports = cookieController;