const redis = require('redis');

// Configura as opções de conexão
const clientOptions = {
  password: 'CrNGnmdsOR2KDPafryM60wgigNIjjGAY',
  socket: {
    host: 'redis-12732.c238.us-central1-2.gce.cloud.redislabs.com',
    port: 12732
  }
};


const client = redis.createClient(clientOptions);


module.exports = { client };
