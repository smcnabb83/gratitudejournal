var pgp = require('pg-promise');
var db = pgp('postgres://postgres:Dmcnan941@localhost/gratitudejournal');

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
                    VALUES (${userEmail}, ${userPasswordhash}, ${userAuthToken}, ${userPasswordResetToken}, 
                            ${userPasswordResetExpiry})`, {
                                userEmail: userData.userEmail,
                                userPasswordhash: userData.userPasswordhash,
                                userAuthToken: userData.userAuthToken,
                                userPasswordResetToken: userData.userPasswordResetToken,
                                userPasswordResetExpiry: userData.userPasswordResetExpiry
                            });
                    
}

dbService.CreateEntry = async function(entryData){

}

exports = dbService;