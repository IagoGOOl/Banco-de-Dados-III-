require('dotenv').config();
import { createClient } from 'redis';

const client = createClient({
    password: 'CrNGnmdsOR2KDPafryM60wgigNIjjGAY',
    socket: {
        host: 'redis-12732.c238.us-central1-2.gce.cloud.redislabs.com',
        port: 12732
    }
});

client.on("connect", () => {
  console.log("Conectado ao Redis Cloud");
});