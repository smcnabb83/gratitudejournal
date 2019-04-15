const express = require('express');
const { body, validationResult } = require('express-validator/check');

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
      .withMessage('You must have an email')
      .isEmail()
      .withMessage('Your email must be a valid email address'),
    body('password')
      .exists()
      .withMessage('You must have a password')
      .isLength({ min: 8 })
      .withMessage('your password must be at least 8 characters'),
    body('repeatPassword')
      .exists()
      .withMessage('You must repeat the password')
      .isLength({ min: 8 })
      .withMessage('your repeated password must be at least 8 characters'),
  ],

  async (req, res) => {
    // 1) Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    // 1b) validate passwords match
    console.log('request body');
    console.log(req.body);
    if (req.body.password !== req.body.repeatPassword) {
      res
        .status(422)
        .json({ errors: ['password and repeat password do not match'] });
      return;
    }
    // 2) Make sure user doesn't already exist
    if (req.db.UserExists(req.body.email)) {
      console.log('user exists');
      res.status(422).json({ errors: ['User already exists'] });
      return;
    }

    console.log('finished user existence check');
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
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
      console.log(e);
      res.status(422).json({
        errors: [
          'There was an error inserting the user, check the server console for details',
        ],
      });
      return;
    }
    res.cookie('userData', token);
    res.send('successful');
  }
);

module.exports = router;
