var express = require('express');
var router = express.Router();

/* AWS Configuration, AWS DocumentClient api Config */
var AWS = require("aws-sdk");
AWS.config.loadFromPath('../dbconfig.json');
AWS.config.update({ region: 'us-east-2' });
var documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

/* Used for Hashing Passwords */
sha1 = require('js-sha1');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Filebox | Login' });
});

router.post('/submit', (req, res) => {
  console.log("login Form Submitted")
  const userName = req.body.username
  const pw = sha1(req.body.pw)

  var params = {
    TableName: 'UserAccountData',
    IndexName : "username-pw-index",
    KeyConditionExpression: "username = :uname and pw = :pw",
    ExpressionAttributeValues: {
      ":uname": userName,
      ":pw": pw
    }
  };

  documentClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        res.render('login', { resulterrmsg: "Login Unsuccessful, Please Try Again" })
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.username + ": " + item.pw);
        });
        if(data.Items.length > 0){
          req.user = data.Items[0]
          res.redirect("/dashboard")
        }else{
          req.user = undefined
          res.render('login', { resulterrmsg: "Login Unsuccessful, Please Try Again" })
        }
        
    }
});

});

module.exports = router;