const express = require('express');
const cors = require('cors');
const redis = require("redis");


const client = redis.createClient({
    password: '4imBPh4k2va56sQc4bDpv0hqyxDjEBhq',
    socket: {
        host: 'redis-17641.c321.us-east-1-2.ec2.cloud.redislabs.com',
        port: 17641
    }
});



const { router } = require('./router/router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const startup = async() => {
	//await client.connect();
	//console.log('conectado ao redis')
	app.listen(3000, () => {
		console.log('serve ON');
	});
}

startup()


