/**
 *
 * @param {Function} onSuccess
 */
function loadAjaxData(onSuccess)
{
	const url = "https://api.chucknorris.io/jokes/random";

	fetch(url)
		.then((response) => response.json())
		.then((data) =>
		{
			onSuccess(data);
			console.log(data);
		});
}

module.exports = loadAjaxData;
