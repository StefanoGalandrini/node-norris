/* import modules */
const http = require("http");
const loadAjaxData = require("./loadAjaxData.js");

/* import dotenv module and initialize it */
const dotenv = require("dotenv");
dotenv.config();

let content = "<h1>Hello World!</h1>";

/**
 * define server port type
 * @type {number}
 */
let port = +process.env.PORT || 3000;

/** define function to handle response
 * @param {http.ServerResponse} res
 * @param {string} content
 */
function htmlResponse(res, content)
{
	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	content = loadAjaxData(onSuccess);
	res.end(content);
}

/* create server */
const server = http.createServer((req, res) =>
{
	htmlResponse(res, content);
});

/* start server */
server.listen(port, function ()
{
	console.log(`Server is running on http://localhost:${port}/`);
});
