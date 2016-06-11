(function(){
	var Locator = function(){
	};

	Locator.prototype = {
		init:function(){
			this.initMap();

		},
		initMap:function(){
			console.log('initing map...');

			var loc = this.getLocation();

			if(!!loc){
				var map = L.map('map').setView([loc.coords.latitude, loc.coords.longitude], 13);

				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: ''
				}).addTo(map);
			}
		},

		getLocation:function(){
			console.log('geolocating...');
			var location = false;
			if ('geolocation' in navigator) {
				/* geolocation is available */
				navigator.geolocation.getCurrentPosition(function(position) {
					location = position;
				});
			} else {
				/* geolocation IS NOT available */
				console.error('Geolocation not supported');
			}

			return location;
		}
	};

	var locator = new Locator();
	locator.init();
})();