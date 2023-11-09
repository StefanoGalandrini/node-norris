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
	let jokes = [];

	// read the file and parse the data
	try
	{
		let data = fs.readFileSync(filePath, 'utf8');
		jokes = JSON.parse(data);
		if (!Array.isArray(jokes))
		{
			jokes = [];
		}
	} catch (error) 
	{
		if (error.code === 'ENOENT')
		{
			console.log('norrisDb.json does not exist. It will be created.');
		} else	
		{
			console.log('Error reading norrisDb.json:', error);
		}
	}

	// add the joke to the array
	jokes.push(joke);

	// write the file
	try
	{
		fs.writeFileSync(filePath, JSON.stringify(jokes, null, 2), "utf-8");
	} catch (error)
	{
		console.log('Error writing joke to file:', err);
	}
}

/* initialize jokes file */
function initializeJokesFile()
{
	try
	{
		fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
		console.log('norrisDb.json has been initialized as empty.');
	} catch (error)
	{
		console.error('Error initializing norrisDb.json:', error);
	}
}

initializeJokesFile();

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
