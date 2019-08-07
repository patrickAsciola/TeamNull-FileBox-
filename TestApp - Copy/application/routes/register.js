var express = require('express');
var router = express.Router();

/* AWS Configuration, AWS DocumentClient api Config */
var AWS = require("aws-sdk");
AWS.config.loadFromPath('../dbconfig.json');
AWS.config.update({ region: 'us-east-2' });
var documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

/* Used for Hashing Passwords */
sha1 = require('js-sha1');

/* GET Register Page Via '/' */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Filebox | Registry' });
});

router.get('register/', function (req, res, next) {
  res.render('register', { title: 'Filebox | Registry' });
});

/* Registration Submission */
router.post('', (req, res) => {
  console.log("Register Form Submitted")
  const userName = req.body.username
  const email = req.body.email
  const pw = sha1(req.body.pw)
  const confPw = sha1(req.body.conf_pw)

  /* Check if passwords match */
  if (pw != confPw) {
    res.render('register', { resulterrmsg: 'Passwords Do Not Match' })

  } else {
    /* Get and format current date*/
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    /* PutItem Request Params for New User */
    var params = {
      TableName: 'UserAccountData',
      Item: {
        'UserID': Math.floor(Math.random() * 100000000),
        'username': userName,
        'email': email,
        'pw': sha1(pw),
        'image_name': 'noimage.jpg',
        'is_verified': false,
        'phone_number': 'not specified yet',
        'account_type': 'standard',
        'account_status': 'active',
        'created_on': today
      }
    };

    /* AWS Document Client sends put request for new item based on previously set params */
    documentClient.put(params, function (err) {
      if (err) {
        console.log("Error", err);
        res.render('register', { resulterrmsg: "Please Try Again, Register Unsuccessful" })
      } else {
        console.log("Success");
        res.render('register', { resultsuccessmsg: "Successfully Registered!" })
      }
    });
  }

});
module.exports = router;