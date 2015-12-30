'use strict';

/**
 * Module dependencies.
 */

	/**
 	* External Module dependencies.
 	*/

		/**
     * "Fast, unopinionated, minimalist web framework for node." 
     * http://expressjs.com
     * https://github.com/strongloop/express
     * https://www.npmjs.com/package/express
     */
		var express = require('express');
		/**
     * "Node-config organizes hierarchical configurations for your app deployments."
     * https://github.com/lorenwest/node-config
     * https://www.npmjs.com/package/config
     */
		//var config = require('config');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

module.exports = function (db,config){

     console.log('Initializing express')
     //initialize express as app
     var app = express();<% _.forEach(expressModules, function(expressModule) { %>
     //<%= expressModule.description %>
     require('./<%= expressModule.name %>')(<%= expressModule.params.toString() %>);<% }); %>
     console.log('Express initialized')
     // this module exports our express app
     return app;
};