const pgp = require('pg-promise')({ capSQL: true });

let db;

const dbService = {};

dbService.userTemplate = {
  userEmail: '',
  userPasswordhash: '',
  userAuthToken: '',
  userPasswordResetToken: '',
  userPasswordResetExpiry: '',
  userFirstName: '',
  userLastName: '',
};

dbService.entryTemplate = {
  userEmail: '',
  userID: '',
  entryTitle: '',
  entryBody: '',
  entryTimestamp: '',
};

dbService.CreateUser = async userData => {
  if (!userData.userEmail) {
    return Promise.reject(Error('userData must contain userEmail field'));
  }

  if (!userData.userPasswordhash) {
    return Promise.reject(
      Error('userData must contain a userPasswordHash field')
    );
  }

  return db.none(
    `INSERT INTO users(userEmail, userPasswordHash, UserAuthToken, UserPasswordResetToken, 
                                        UserPasswordResetExpiry
                    VALUES ($(userEmail), $(userPasswordhash), $(userAuthToken), $(userPasswordResetToken), 
                            $(userPasswordResetExpiry))`,
    {
      userData,
    }
  );
};

dbService.UserExists = userEmail => {
  try {
    db.none('SELECT userID from users where userEmail = $1', userEmail);
  } catch (e) {
    return true;
  }
  return false;
};

dbService.CreateEntry = async ed => {
  const entryData = ed;
  if (!entryData.userEmail && !entryData.userID) {
    return Promise.reject(
      Error('entryData must contain either the userID or the userEmail field')
    );
  }

  if (!entryData.userID) {
    try {
      entryData.userID = await db.one(
        'SELECT userID from users where userEmail = $1',
        [entryData.userEmail]
      );
    } catch (e) {
      console.log(e);
    }
  }

  return db.none(
    `INSERT INTO users(userID, entryTitle, entryBody, entryTimestamp
                        VALUES ($(userID), $(entryTitle), $(entryBody), $(entryTimestamp))`,
    {
      entryData,
    }
  );
};

const createDBConnection = (user, password, host, port, database) => {
  const cn = {
    host,
    port,
    user,
    password,
    database,
  };
  db = pgp(cn);
  return (req, res, next) => {
    req.db = dbService;
    next();
  };
};

module.exports.createDBConnection = createDBConnection;
