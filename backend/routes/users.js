const express = require('express');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorTypes } = require('../middleware/error_handling');

/* GET check for valid jwt */

const LogUserIn = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  // check to make sure user isn't already logged on
  if (req.userEmail) {
    res.status(422).json({ errors: [errorTypes.ALREADY_LOGGED_IN] });
    return;
  }
  // Get user info from database

  const userLogonInfo = await req.db.GetUserLogonInformation(username);
  if (userLogonInfo.error) {
    res.status(422).json({
      errors: [errorTypes.INVALID_USERNAME_PASSWORD],
    });
    return;
  }
  // Compare password to hash in database
  console.log(userLogonInfo);
  const passResponse = await bcrypt.compare(password, userLogonInfo.pass);
  console.log('post compErr');
  if (!passResponse) {
    console.log('password invalid');

    res.status(422).json({
      errors: [errorTypes.INVALID_USERNAME_PASSWORD],
    });
    return;
  }
  // Create new JWT for user
  const token = jwt.sign({ email: username }, process.env.JWT_KEY);
  // Return cookie to user
  res.cookie('userData', token);
  res.send('successful');
};

const CreateNewUser = async (req, res) => {
  // 1) Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  // 1b) validate passwords match
  if (req.body.password !== req.body.repeatPassword) {
    res
      .status(422)
      .json({ errors: [errorTypes.PASSWORD_REPEAT_DOES_NOT_MATCH] });
    return;
  }
  // 2) Make sure user doesn't already exist
  if (await req.db.UserExists(req.body.email)) {
    res.status(422).json({ errors: [errorTypes.USER_EXISTS] });
    return;
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);
  let userid;

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
    userid = await req.db.CreateUser(newUser);
  } catch (e) {
    console.log(e);
    res.status(422).json({
      errors: [errorTypes.USER_CREATION_ERROR],
    });
    return;
  }
  console.log(userid);
  res.cookie('userData', token);
  res.send('successful');
};

router.get('/:jwt', (req, res) => {
  try {
    jwt.verify(req.params.jwt, process.env.JWT_KEY);
  } catch (err) {
    res.status(401).json({
      errors: [errorTypes.INVALID_TOKEN],
      valid: false,
    });
  }
  res.status(200).json({
    valid: true,
  });
});

/* POST log a user on */
router.post('/logon', LogUserIn);

/* POST create new user. */

router.post(
  '/',
  [
    body('email')
      .exists()
      .withMessage(errorTypes.EMAIL_ADDRESS_REQUIRED)
      .isEmail()
      .withMessage(errorTypes.EMAIL_ADDRESS_INVALID),
    body('password')
      .exists()
      .withMessage(errorTypes.PASSWORD_REQUIRED)
      .isLength({ min: 8 })
      .withMessage(errorTypes.PASSWORD_LENGTH),
    body('repeatPassword')
      .exists()
      .withMessage(errorTypes.PASSWORD_REPEAT_DOES_NOT_MATCH)
      .isLength({ min: 8 })
      .withMessage(errorTypes.PASSWORD_REPEAT_DOES_NOT_MATCH),
  ],
  CreateNewUser
);

module.exports = router;
