const cookieController = {
  setSSIDCookie: (req, res, next) => {
    if (res.locals.userCreated || res.locals.verified) {
      const userId = res.locals.userId;
      res.cookie('ssid', userId, {httpOnly: true});
    }
    return next();
  },

  verifyCookie: (req, res, next) => {

  }
}

module.exports = cookieController;