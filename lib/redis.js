const { createClient } = require("redis");
const env = require('../env');
require('dotenv').config();

const client = createClient ({
  url : process.env.REDIS_ENDPOINT || env.REDIS_ENDPOINT,
});

const redis = async() => {
  if (client.connected) {
    return client;
  }

  client.on("error", function(err) {
    throw err;
  });

  await client.connect();
  return client;
}

module.exports = redis;