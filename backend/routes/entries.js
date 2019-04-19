const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const checkUserLoggedIn = (req, res, next) => {
  if (!req.userEmail) {
    res.status(403).json({ errors: ['You need to be logged in to do that'] });
    return;
  }
  next();
};

const createNewEntry = (req, res, next) => {
  if (!req.userEmail) {
    console.log('you need to be logged in to do this');
    next();
  }
  console.log('request body');
  console.log(req.body);
  const entryInfo = {
    userEmail: req.userEmail,
    entryTitle: req.body.title,
    entryBody: req.body.entry,
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
};

const getEntriesByUserID = async (req, res) => {
  const response = await req.db
    .GetUserID(req.userEmail)
    .catch(e => console.log(e));

  if (response.error) {
    res.status(422).json({ errors: response.error });
    return;
  }

  const entries = await req.db.GetUserEntries(response.userid);

  res.status(200).json(entries);
};

const getEntryByEntryID = async (req, res) => {
  const entryID = req.params.id;

  const response = await req.db
    .GetUserID(req.userEmail)
    .catch(e => console.log(e));
  if (response.error) {
    res.status(422).json({ errors: response.error });
    return;
  }
  const entryDetail = await req.db.GetEntryDetail(entryID);

  if (entryDetail.errors) {
    console.log(entryDetail.errors);
    res.status(422).json(entryDetail.errors);
    return;
  }

  if (entryDetail.userid !== response.userid) {
    res
      .status(422)
      .json({ errors: ['you are not authorized to view this entry'] });
    return;
  }

  res.status(200).json(entryDetail);
};

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
  checkUserLoggedIn,
  createNewEntry
);

// GET entries by userID
router.get('/user', checkUserLoggedIn, getEntriesByUserID);

// GET entries by entryID
router.get('/:id', checkUserLoggedIn, getEntryByEntryID);

router.get('/', (req, res) => {
  res.send('This route also works');
});

module.exports = router;
