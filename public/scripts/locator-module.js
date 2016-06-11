(function(){
	var Locator = function(){
	};

	Locator.prototype = {
		MILES:10,
		init:function(){
			this.getLocation();

		},
		initMap:function(position){
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
			var base = 'http://apis.mondorobot.com/beer-finder',
				distance = this.MILES,
				//TODO: get from query string
				beer = $('#map').data('beer');
			
			if(!beer){
				return;
			}

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
				var locator = this,
					$list = $('#locations-list');
				$.each(response.results,function(i, result){
					var address = [result.address.street, result.address.city, result.address.state].join(', '),
						additionalBeers = function(beers) {
							if(beers.length){
								var content = ['Additional beer:\n<ul>'],
									items = $.map(beers,function(beer,i){
										return '<li>' + beer.name + '</li>'
									}).join('');

								content.push(items,'</ul>')

								return content.join('');
							}
						};

					locator.geocodeAddr(result);
					$list.append([
						'<li>',
							'<article>',
								'<h1>',
									result.name.toLowerCase(),
								'</h1>',
								'<dl>',
									'<dt>Address:</dt>',
									'<dd>', address, '</dd>',
									'<dt>Phone:</dt>',
									'<dd><a href="tel:', result.phone ,'">', result.phone,'</a></dd>',
								'</dl>',
								additionalBeers(result.additional_beers),
							'</article>',
						'</li>'
					].join(''));
				});
			});
		},

		geocodeAddr:function(result){
			var KEY = 'AIzaSyCecj5dwIl4_zWPH9GwY_kOPDMJK3Z7fZg',
				address = result.address,
				base = 'https://maps.googleapis.com/maps/api/geocode/json?',
				addr = [address.street, address.city, address.state].join(', ')
				url = [base,'address=',addr,'&key=',KEY].join('');

			$.getJSON(url)
				.then($.proxy(this.plotLocation, this));
		},

		plotLocation:function(response){
			if(response.status === 'OK'){
				var map = this.map,
					result = response.results[0],
					address = result.formatted_address,
					coords = result.geometry.location,
					content = ['<p>', address, '</p>'],
					avery = L.icon({
						iconUrl: '/images/avery-sm-icon.png',
						iconSize:[28, 31], // size of the icon
						iconAnchor:[14, 15], // point of the icon which will correspond to marker's location
						popupAnchor:[28, 31] // point from which the popup should open relative to the iconAnchor
					});

				L.marker([coords.lat, coords.lng],{ icon: avery })
					.addTo(map)
					.bindPopup(content.join(''));
					//.openPopup()
					
			}
			else{
				console.error(response.status);
			}
		},

		getLocation:function(){
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