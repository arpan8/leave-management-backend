const { redis } = require('./redis-config');

const QUEUE_NAME = {
    FILE_UPLOAD: 'FILE_UPLOAD'
}

const options = {
    settings: {
        lockDuration: 3000,
        stalledInterval: 0,
        maxStalledCount: 1,
        guardInterval: 500,
        retryProcessDelay: 400,
    },
}

module.exports.QUEUE_NAME = QUEUE_NAME

module.exports.queueConfig = {
    redis,
    options
}




