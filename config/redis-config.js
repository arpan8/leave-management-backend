require('dotenv').config();

let redis;

if (process.env.REDIS_URL) {
    redis = {
        url: process.env.REDIS_URL,
        connectTimeout: 40000
    }
} else {
    redis = {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1',
        connectTimeout: 40000
    }
}


module.exports = {
    redis
};


