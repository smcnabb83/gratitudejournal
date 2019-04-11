const pgp = require('pg-promise')({capSQL: true});
var db;

const dbService = {};

dbService.userTemplate = {
    userEmail: "",
    userPasswordhash: "",
    userAuthToken: "",
    userPasswordResetToken: "",
    userPasswordResetExpiry: "",
    userFirstName: "",
    userLastName: "",

};

dbService.entryTemplate = {
    userEmail: "",
    userID: "",
    entryTitle: "",
    entryBody: "",
    entryTimestamp: ""
};



dbService.CreateUser = async function(userData){
    if(! userData.userEmail){
        return Promise.reject('userData must contain userEmail field');
    }

    if(!userData.userPasswordhash){
        return Promise.reject('userData must contain a userPasswordHash field');
    }

    return db.none(`INSERT INTO users(userEmail, userPasswordHash, UserAuthToken, UserPasswordResetToken, 
                                        UserPasswordResetExpiry
                    VALUES ($(userEmail), $(userPasswordhash), $(userAuthToken), $(userPasswordResetToken), 
                            $(userPasswordResetExpiry))`, {
                                userEmail: userData.userEmail,
                                userPasswordhash: userData.userPasswordhash,
                                userAuthToken: userData.userAuthToken,
                                userPasswordResetToken: userData.userPasswordResetToken,
                                userPasswordResetExpiry: userData.userPasswordResetExpiry
                            });
                    
}

dbService.CreateEntry = async function(entryData){
    if(!entryData.userEmail && !entryData.userID){
        return Promise.reject('entryData must contain either the userID or the userEmail field');
    }

    if(!entryData.userID){
        try{
        entryData.userID = await db.one(`SELECT userID from users where userEmail = $1`, [entryData.userEmail]);
        } catch(e) {
            console.log(e);
        }

        return db.none(`INSERT INTO users(userID, entryTitle, entryBody, entryTimestamp
                        VALUES ($(userID), $(entryTitle), $(entryBody), $(entryTimestamp))`, {
                            userID:         entryData.userID,
                            entryTitle:     entryData.entryTitle,
                            entryBody:      entryData.entryBody,
                            entryTimestamp: entryData.entryTimestamp
                        });

    }
}

var createDBConnection = function(user, password, host, port, database){
    const cn = {
        host,
        port,
        user,
        password,
        database,
    };
    db = pgp(cn);
    return function (req, res, next){
        req.db = dbService;
        next();
    }
    
}

module.exports.createDBConnection = createDBConnection;