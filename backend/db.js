const pgp = require('pg-promise')({
  capSQL: true,
});
const pgmon = require('pg-monitor');

pgmon.attach({ capSQL: true }, ['query', 'error']);

let db;

function DbService(dbase) {
  this.db = dbase;
}

DbService.prototype.userTemplate = {
  userEmail: '',
  userPasswordhash: '',
  userAuthToken: '',
  userPasswordResetToken: '',
  userPasswordResetExpiry: '',
  userFirstName: '',
  userLastName: '',
};

DbService.prototype.entryTemplate = {
  userEmail: '',
  userID: '',
  entryTitle: '',
  entryBody: '',
  entryTimestamp: '',
};

DbService.prototype.CreateUser = async function(userData) {
  if (!userData.userEmail) {
    return Promise.reject(Error('userData must contain userEmail field'));
  }

  if (!userData.userPasswordhash) {
    return Promise.reject(
      Error('userData must contain a userPasswordHash field')
    );
  }

  let passwordResetExpiry = null;
  if (
    userData.userPasswordResetExpiry &&
    userData.userPasswordResetExpiry !== ''
  ) {
    passwordResetExpiry = userData.userPasswordResetExpiry;
  }
  console.log(userData);
  return this.db.none(
    `INSERT INTO users(userEmail, userPasswordHash, UserAuthToken, UserPasswordResetToken, 
                                        UserPasswordResetExpiry)
                    VALUES ($(userEmail), $(userPasswordhash), $(userAuthToken), $(userPasswordResetToken), 
                            $(userPasswordResetExpiry))`,
    {
      userEmail: userData.userEmail,
      userPasswordhash: userData.userPasswordhash,
      userAuthToken: userData.userAuthToken,
      userPasswordResetToken: userData.userPasswordResetToken,
      userPasswordResetExpiry: passwordResetExpiry,
    }
  );
};

DbService.prototype.UserExists = function(userEmail) {
  try {
    this.db.none('SELECT userID from users where userEmail = $1', userEmail);
  } catch (e) {
    return true;
  }
  return false;
};

DbService.prototype.CreateEntry = async function(ed) {
  const entryData = ed;
  console.log(entryData);
  if (!entryData.userEmail && !entryData.userID) {
    return Promise.reject(
      Error('entryData must contain either the userID or the userEmail field')
    );
  }

  if (!entryData.userID) {
    try {
      const { userid } = await this.db.one(
        'SELECT userID from users where userEmail = $1',
        [entryData.userEmail]
      );
      entryData.userID = userid;
    } catch (e) {
      console.log(e);
    }
  }
  console.log(entryData);

  return this.db.none(
    `INSERT INTO entries(userID, entryTitle, entryBody, entrydate)
                        VALUES ($(userID), $(entryTitle), $(entryBody), $(entryTimestamp))`,
    entryData
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
  db.connect().then(obj => {
    obj.client.query('LISTEN "watchers"');
    obj.client.on('notification', data => {
      console.log(data.payload);
    });
  });

  return (req, res, next) => {
    req.db = new DbService(db);
    console.log(req.db);
    next();
  };
};

module.exports.createDBConnection = createDBConnection;
