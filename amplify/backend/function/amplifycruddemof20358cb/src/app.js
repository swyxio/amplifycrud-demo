/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DYNAMOBBB78899_ARN
	STORAGE_DYNAMOBBB78899_NAME
Amplify Params - DO NOT EDIT */ // from REST API + DynamoDB template
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var cors = require('cors')
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

/* 1. Import the AWS SDK and create an instance of the DynamoDB Document Client */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

/* 2. create a function that will generate a unique ID for each entry in the database */
function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/* 3. Update the app.get request with the following code for reading all contacts */
app.get("/contact", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_DYNAMOBBB78899_NAME,
  };
  console.log({ params });
  try {
    docClient.scan(params, function (err, data) {
      if (err) res.json({ err });
      else res.json({ data });
    });
  } catch (err) {
    console.log("2", { err });
    res.json({ err });
  }
});

/* 4. Update the app.post request with the following code for creating a new contact */
app.post("/contact", function (req, res) {
  var params = {
    TableName: process.env.STORAGE_DYNAMOBBB78899_NAME,
    Item: {
      id: id(),
      name: req.body.name,
      phone: req.body.phone,
    },
  };
  console.log({ params });
  try {
    docClient.put(params, function (err, data) {
      console.log({ err, data });
      if (err) res.json({ err });
      else res.json({ success: "Contact created successfully!" });
    });
  } catch (err) {
    console.log("3", { err });
    res.json({ err });
  }
});
// from REST API + DynamoDB template
app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
