const Queue = require('./index');
const { QUEUE_NAME } = require('../../config/queue');

module.exports = {
    addFileToQueue
};


function addFileToQueue ( details ) {
    addToQueue( QUEUE_NAME.FILE_UPLOAD, details );
}

function addToQueue ( name, payload ) {
    //console.log(name)
    const options = {
        attempts            : 2,
        timeout             : 40000,
        delay               : 100,
    };

    //console.log(Queue[ name ])
    Queue[ name ].add( payload, options )
        .then(( response ) => {
            console.log( `[ ${ name } ] => [ JOB ADDED. ID: ${ response.id } ]` );
        })
        .catch(( error ) => {
            console.log( `[ ${ name } ] => [ ERROR WHILE ADDING JOB ]`, error );
        })
}

