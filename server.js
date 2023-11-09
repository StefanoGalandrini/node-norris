/* import modules */
const http = require("http");
const fs = require("fs");
const path = require("path");
const loadAjaxData = require("./loadAjaxData.js");

/* import dotenv module and initialize it */
const dotenv = require("dotenv");
dotenv.config();

/**
 * define server port type
 * @type {number}
 */
let port = +process.env.PORT || 3000;

/* create server */
const server = http.createServer((req, res) =>
{
	loadAjaxData((data) =>
	{
		const joke = data.value;

		res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
		res.end(`<h1>${joke}</h1>`);
	});
});

/* start server */
server.listen(port, function ()
{
	console.log(`Server is running on http://localhost:${port}/`);
});
