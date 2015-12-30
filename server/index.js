'use strict';

var config = require('../config/config')

var db ="";

var expressApp = require('./express')(db,config);
expressApp.listen(config.port, function() {
  console.log('the server is launched on port ' + config.port)
});