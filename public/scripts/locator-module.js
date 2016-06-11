(function(){
	var Locator = function(){
	};

	Locator.prototype = {
		MILES:10,
		init:function(){
			this.getLocation();

		},
		initMap:function(position){
			console.log('initing map...');
			

			if(!!position){
				var coords = [position.coords.latitude, position.coords.longitude],
					zoom = 14,
					metersPerMile = 1609.34,
					radius = (this.MILES * metersPerMile) / 2, // 25 miles
					map = L.map('map').setView(coords, zoom);

				//add map
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '',
					maxZoom: 18
				}).addTo(map);
				// add "you're here marker"
				L.marker(coords).addTo(map);

				// radius
				// var circle = L.circle(coords, radius, {
				// 	color: 'red',
				// 	fillColor: '#f03',
				// 	fillOpacity: 0.05, 
				// 	weight:1
				// }).addTo(map);

				this.map = map;
			}
		},

		findBeer:function(position){
			console.log('finding beer...');
			var base = 'http://apis.mondorobot.com/beer-finder',
				distance = this.MILES,
				//TODO: get from query string
				beer = 'ipa';
			
			var $ajax = $.ajax({
				context:this,
				data:{
					beer:beer,
					distance:distance,
					lat:position.coords.latitude,
					long:position.coords.longitude
				},
				url:base
			}).then(function(response){
				var locator = this;
				$.each(response.results,function(i, result){
					locator.geocodeAddr(result.address);
				});
			});
		},

		geocodeAddr:function(address){
			var KEY = 'AIzaSyCecj5dwIl4_zWPH9GwY_kOPDMJK3Z7fZg',
				base = 'https://maps.googleapis.com/maps/api/geocode/json?',
				addr = [address.street, address.city, address.state].join(', ')
				url = [base,'address=',addr,'&key=',KEY].join('');

			console.log('geocoding ' + addr + '...');

			$.getJSON(url)
				.then($.proxy(this.plotLocation, this));
		},

		plotLocation:function(response){
			if(response.status === 'OK'){
				var map = this.map,
					result = response.results[0],
					address = result.formatted_address,
					coords = result.geometry.location;

				console.log('plotting ' + address + '...');

				L.marker([coords.lat, coords.lng]).addTo(map)
					.bindPopup(address);
			}
			else{
				console.error(response.status);
			}
		},

		getLocation:function(){
			console.log('geolocating...');
			var locator = this;
			if ('geolocation' in navigator) {
				/* geolocation is available */
				navigator.geolocation.getCurrentPosition(function(position) {
					locator.initMap(position);
					locator.findBeer(position);
				});
			} else {
				/* geolocation IS NOT available */
				console.error('Geolocation not supported');
			}
		}
	};

	var locator = new Locator();
	locator.init();
})();