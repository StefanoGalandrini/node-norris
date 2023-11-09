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

/* define file path */
const filePath = path.join(__dirname, 'norrisDb.json');


/* read file and save joke */
function saveJoke(joke)
{
	fs.readFile(filePath, 'utf8', (err, data) =>
	{
		let jokes = [];

		if (!err && data)
		{
			try
			{
				jokes = JSON.parse(data);
				if (!Array.isArray(jokes))
				{
					jokes = [];
				}
			} catch (e)
			{
				jokes = [];
			}
		}

		jokes.push(joke);

		fs.writeFile(filePath, JSON.stringify(jokes, null, 2), (err) =>
		{
			if (err)
			{
				console.error('Error writing joke to file:', err);
			}
		});
	});
}


/* create server */
const server = http.createServer((req, res) =>
{
	loadAjaxData((data) =>
	{
		const joke = data.value;

		saveJoke(joke);

		res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
		res.end(`<h1>${joke}</h1>`);
	});
});

/* start server */
server.listen(port, function ()
{
	console.log(`Server is running on http://localhost:${port}/`);
});
