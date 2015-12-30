module.exports = {
	"port":3000,
	"expressModules":[
		{
			"name":"locals",
			"description":"set local variables",
			"params":["app","config"]
		},
		{
			"name":"compression",
			"description":"setup the compression middleware",
			"params":["app"]
		},
		{
			"name":"body-parser",
			"description":"Body Parser Middleware",
			"params":["app"]
		},
		{
			"name":"method-override",
			"description":"Override http methods to enhance them",
			"params":["app"]
		},
		{
			"name":"logger",
			"description":"setup the logger",
			"params":["app"]
		},
		{
			"name":"environement-middleware",
			"description":"init environement dependent middleware",
			"params":["app"]
		},
		{
			"name":"view-engine",
			"description":"setup the view engine",
			"params":["app"]
		},
		{
			"name":"helmet",
			"description":"Secure headers with helmet",
			"params":["app"]
		},
		{
			"name":"static",
			"description":"serve static files",
			"params":["app"]
		},
		{
			"name":"cookie-parser",
			"description":"Cookie parsing middleware",
			"params":["app"]
		},
		{
			"name":"routes",
			"description":"init routes",
			"params":["app"]
		},
		{
			"name":"error-logger",
			"description":"setup the error logger",
			"params":["app"]
		},
		{
			"name":"error-handling",
			"description":"",
			"params":["app"]
		}
	],
	"app":{
		"title":"Wooh Original Office Store",
		"description":"Votre spécialiste en aménagement de bureau et bien-être au travail",
		"keywords":"chaise de bureau, bureau, design, ergonomie, aménagement, bien-être au travail"
	},
	"locals":[
		{
			"key":"title",
			"value":{
				"content":"Wooh Original Office Store"
			}
		},
		{
			"key":"description",
			"value":{
				"content":"Votre spécialiste en aménagement de bureau et bien-être au travail"
			}
		},
		{
			"key":"keywords",
			"value":{
				"content":"chaise de bureau, bureau, design, ergonomie, aménagement, bien-être au travail"
			}
		}
	],
	"compression":{
		"extensions": ['json',"text","javascript","css","font","svg"],
		"level": 9
	},
	"logger":{
		"transports":[
			{"type":"Console"}
		]
	},
	"viewEngine":{
		"extension":"server.view.jade",
		"engine":"jade",
		"directory":"./dist/views/"
	},
	"static":{
		"directory":"./dist/static"
	},
	"routes":[
		{"moduleName":"core"}
	]
}