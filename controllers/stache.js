var bodyParser = require('body-parser'),
	request = require('request'),
	parseJson = require('parse-json');

var stacheController = {
	stache: function(req, res) {
		var beers = [];
		request('http://apis.mondorobot.com/beers/', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				beers = parseJson(body).beers;
			}

			res.render('stache',{
				beers:beers
			});
		});
	}
}

module.exports = stacheController;