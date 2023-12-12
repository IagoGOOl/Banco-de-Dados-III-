require('dotenv').config();
const redis = require('redis');

const client = redis.createClient();