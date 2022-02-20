const Queue = require('bull');
const { QUEUE_NAME, queueConfig } = require('../../config/queue');

const queueProcesses = {}
for ( let [ key, value ] of Object.entries( QUEUE_NAME ) ) {
    queueProcesses[value] = new Queue( value, queueConfig.redis, queueConfig.options );
}

module.exports = queueProcesses