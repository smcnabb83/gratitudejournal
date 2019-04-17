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
  try {
    return this.db.one(
      `INSERT INTO users(userEmail, userPasswordHash, UserAuthToken, UserPasswordResetToken, 
                                        UserPasswordResetExpiry, userFirstName, userLastName)
                    VALUES ($(userEmail), $(userPasswordhash), $(userAuthToken), $(userPasswordResetToken), 
                            $(userPasswordResetExpiry), $(userFirstName), $(userLastName)) RETURNING userid`,
      userData
    );
  } catch (e) {
    console.log('rejected promise in CreateUser');
    console.log(e);
    return Promise.reject(e);
  }
};

DbService.prototype.UserExists = function(userEmail) {
  let exists = false;
  this.db
    .none('SELECT userID from users where userEmail = $1', userEmail)
    .catch((exists = true));
  return exists;
};

DbService.prototype.GetUserLogonInformation = async function(userEmail) {
  try {
    const { userPassword } = await this.db.one(
      'SELECT userpasswordhash from users where useremail = $1',
      userEmail
    );
    return { pass: userPassword };
  } catch (e) {
    return { error: e };
  }
};

DbService.prototype.CreateEntry = async function(ed) {
  const entryData = ed;
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

// GetUserID gets the logged in user's ID.
DbService.prototype.GetUserID = async function(email) {
  let ret;
  try {
    ret = await this.db.one(
      'SELECT userid FROM users where useremail = $1',
      email
    );
  } catch (e) {
    console.log(e);
    ret = { error: 'a user with that email does not exist' };
  }
  return ret;
};

DbService.prototype.GetUserEntries = async function(userid) {
  let ret;
  try {
    ret = await this.db.any(
      'SELECT entryid, entrytitle, entrydate FROM entries where userid = $1',
      userid
    );
  } catch (e) {
    ret = { errors: ['There are no entries for this user to retrieve'] };
  }
  return ret;
};

DbService.prototype.GetEntryDetail = async function(entryid) {
  let ret;
  try {
    ret = await this.db.one(
      'SELECT entrybody, userid FROM entries where entryid = $1',
      entryid
    );
  } catch (e) {
    console.log(e);
    ret = {
      errors: [
        'There was an error retrieving this entry. If this continues, please contact the webmaster',
      ],
    };
  }
  return ret;
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
    next();
  };
};

module.exports.createDBConnection = createDBConnection;
