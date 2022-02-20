// /**
//  * PRODUCTION DEPLOYMENT WITH CLUSTER MODE
//  * @type {{apps: [{args: string, instances: string, name: string, exec_mode: string, script: string}]}}
//  */
// module.exports = {
//   apps: [{
//     name: 'DALOS-API',
//     exec_mode: 'cluster',
//     instances: '1',
//     script: './index.js',
//     args: 'start',
//   }],
// };

const requireAll    = require('require-all');
const fs            = require('fs');

const allProcesses = requireAll({
      dirname     :  __dirname+'/worker/',
      filter      :  /(.+-WORKER)\.js$/i,
      excludeDirs :  /^\.(git|svn)$/,
      recursive   : true
    }),
    processes = [],
    PM2_LOG_PATH = `${ __dirname }/pm2_logs`;
    
    if ( !fs.existsSync( PM2_LOG_PATH ) ){
        fs.mkdirSync( PM2_LOG_PATH );
    }

processes.push({
    name: 'LEAVE-MANAGEMENT-API',
    exec_mode: 'cluster',
    instances: '1',
    script: './app.js',
    args: 'start',
});

for ( p in allProcesses ) {
    processes.push({
        name            : p,
        script          : `${ __dirname }/worker/${ p }.js`,
        error_file      : `${ PM2_LOG_PATH }/${ new Date().toDateString() }-${ new Date().toLocaleTimeString() }-${ p }-err.log`,
        out_file        : `${ PM2_LOG_PATH }/${ new Date().toDateString() }-${ new Date().toLocaleTimeString() }-${ p }-out.log`,
        watch           : false,
        env_development : {
          NODE_ENV       : "development"
        },
        env_production  : {
          NODE_ENV       : "production"
        },
        exec_mode  : "cluster",
        instances  : 1,
    });
}

module.exports = {
  apps: processes,
};

