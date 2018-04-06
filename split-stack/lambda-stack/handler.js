'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

function getCountPromise() {
  // load count
  return dynamodb.get({
    TableName : process.env.DYNAMODB_HOGE_TABLE_NAME,
    Key: {
      id: "count"
    }
  }).promise();
}

function putCountPromise(count) {
  // save count
  return dynamodb.put({
    TableName : process.env.DYNAMODB_HOGE_TABLE_NAME,
    Item: {
      id: "count",
      value: count
    }
  }).promise();
}

module.exports.hello = (event, context, callback) => {
  console.log("table name:", process.env.DYNAMODB_HOGE_TABLE_NAME);
  let count;
  getCountPromise().then(data => {
    count =  (data.Item == null) ? 1 : data.Item.value + 1;
    putCountPromise(count);
  }).then( () => {
    // return response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'saved count:'+count,
      }),
    };
    callback(null, response);
  }).catch(e => {
    // error
    console.log(e);
  });
}
