var request = require('request'),
	parseJson = require('parse-json');

var locatorController = {
	locator: function(req, res) {
		var allbeer = {}, beer = {}, id = '';
		request('http://apis.mondorobot.com/beers/', function (error, allResponse, allBody) {
			if (!error && allResponse.statusCode == 200) {
				allbeer = allBody;

				if(req.params.id !== ''){
					request('http://apis.mondorobot.com/beers/' + req.params.id, function(err, beerResp, beerBody){
						beer = parseJson(beerBody).beer;

						res.render('locator', { 
							id: req.params.id,
							beer: beer,
							allbeer: allbeer
						});
					});
				}
				else{
					res.render('locator', { 
						allbeer: allbeer,
						beer:beer,
						id:id
					});
				}
			}
		});
	}
};

module.exports = locatorController;