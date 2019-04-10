var express = require('express');
const {body } = require('express-validator/check');
var router = express.Router();

router.post('/entries',[
    body('title').exists().trim().escape(),
    body('entry').exists().trim().escape()
] ,function(req, res, next){
    //Check if user is logged in
    next();
    //Insert entry into db
})

//GET entries by entryID
router.get('/entries/:id', function( req, res) {

});



router.get('/entries', function(req, res){
    res.write("This route also works");
})

module.exports = router;