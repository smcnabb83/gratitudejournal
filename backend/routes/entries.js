const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

router.post(
  '/entries',
  [
    body('title')
      .exists()
      .trim()
      .escape(),
    body('entry')
      .exists()
      .trim()
      .escape(),
  ],
  (req, res, next) => {
    // Check if user is logged in
    next();
    // Insert entry into db
  }
);

// GET entries by entryID
router.get('/entries/:id', (req, res) => {});

router.get('/entries', (req, res) => {
  res.write('This route also works');
});

module.exports = router;
