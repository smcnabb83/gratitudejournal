const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

router.post(
  '/',
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
    if (!req.userEmail) {
      console.log('you need to be logged in to do this');
      next();
    }
    const entryInfo = {
      userEmail: req.userEmail,
      entryTitle: req.body.title,
      entryBody: req.body.body,
      entryTimestamp: new Date(),
    };
    req.db
      .CreateEntry(entryInfo)
      .then(res.redirect(200, `${process.env.FRONTEND_SERVER}/`))
      .catch(function(error) {
        console.log(error);
      });
    // Insert entry into db
    next();
  }
);

// GET entries by entryID
router.get('/:id', (req, res) => {});

router.get('/', (req, res) => {
  res.send('This route also works');
});

module.exports = router;
