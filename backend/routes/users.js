const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* POST create new user. */

router.post(
  '/',
  [
    body('email')
      .exists()
      .isEmail(),
    body('password').exists(),
    body('repeatPassword').exists(),
  ],

  async (req, res, next) => {
    // 1) Validate input
    // 1b) validate passwords match
    if (req.body.password !== req.body.repeatPassword) {
      res.send('password and repeat password do not match');
    }
    // 2) Make sure user doesn't already exist
    if (req.db.UserExists(req.body.email)) {
      next();
    }
    // 3) If user doesn't already exist, create the user in the db
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // 3a) hash the provided password
    // 3b) create a jwt token for the user
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
    // 3c) insert the user into the db
    const newUser = {
      userEmail: req.body.email,
      userPasswordhash: hashedPass,
      userAuthToken: token,
      userPasswordResetToken: null,
      userPasswordResetExpiry: null,
      userFirstName: req.body.firstName,
      userLastName: req.body.lastName,
    };
    try {
      await req.db.CreateUser(newUser);
    } catch (e) {
      res.send(
        'There was an error inserting the user, check the server console for details'
      );
      return Promise.reject(Error('User was not successfully created'));
    }
    res.cookie('userInfo', token);
    res.redirect(200, '/');
    return Promise.resolve();
  }
);

module.exports = router;
