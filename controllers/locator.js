var locatorController = {
	locator: function(req, res) {

		if(!!req.params.id){
			res.render('locator', { beer: req.params.id });
		}
		else{
			res.render('locator');
		}
		
	}
};

module.exports = locatorController;