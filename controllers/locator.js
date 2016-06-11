var request = require('request');

var locatorController = {
	locator: function(req, res) {
		var allbeer;
		request('http://apis.mondorobot.com/beers/', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				allbeer = body;
			}

			res.render('locator', { 
				beer: req.params.id,
				allbeer: allbeer
			});
		});
	}
};

module.exports = locatorController;