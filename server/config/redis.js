

const {createClient} = require('redis')
const redis = createClient({
    username: 'default',
    password: 'ddvgrgQxhnJQhYM9VCA3hvKt7zfdo2wD',
    socket: {
        host: 'redis-13383.c262.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 13383
    }
});
redis.on('error', err => console.log('❌ Redis Client Error:', err));




redis.on('ready', () => {
    console.log('✅ Connected to Redis successfully!');
});
redis.connect()
module.exports = redis;