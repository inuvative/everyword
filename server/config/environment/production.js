'use strict';

// Production specific configuration
// =================================
function getDbName(appName){
	if(appName==='everyworddev'){
		return 'everyword';
	}
	return appName;
}

module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            '0.0.0.0',

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/everyword'
  }
};
