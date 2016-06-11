(function(){
	var Locator = function(){
	};

	Locator.prototype = {
		MILES:10,
		ALL_BEER:{},
		MARKERS:{},
		BEER:{},
		init:function(){
			var $description = $('#Description');
			this.$root = $('#root');
			this.ALL_BEER = this.$root.data('all-beer').beers;
			this.BEER = $description
				.data('beer');
				
			$description.removeAttr('data-beer');

			this.$root
				.data('all-beer',this.ALL_BEER)
				.data('beer', this.BEER)
				.removeAttr('data-all-beer');

			var desc = this.getParameterByName('desc'),
				auth = this.getParameterByName('auth');

			if(!!desc){
				$('#Description .hipster-text').text(desc);
			}

			if(!!auth){
				$('#beerSignature').text(auth);
			}

			this.mapAllBeers();
			this.getLocation();
			this.attachEvents();

		},
		initMap:function(position){
			if(!!position){
				var coords = [position.coords.latitude, position.coords.longitude],
					zoom = 14,
					metersPerMile = 1609.34,
					radius = (this.MILES * metersPerMile) / 2, // 25 miles
					map = L.map('map').setView(coords, zoom);

				//add map
				L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '',
					maxZoom: 18
				}).addTo(map);
				// add "you are here" marker
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
		attachEvents:function(){
			this.$root.on('click','.location h3',$.proxy(function(e){
				var $target = $(e.currentTarget),
					establishment = $target
						.attr('class')
						.replace('capitalize','')
						.trim();

				if(this.MARKERS[establishment]){
					this.map.panTo(this.MARKERS[establishment]);
				}
			},this))
		},
		findBeer:function(position, distance){
			var base = 'https://apis.mondorobot.com/beer-finder',
				distance = distance || this.MILES,
				maxDistance = 100,
				//TODO: get from query string
				beer = $('#map').data('beer-id'),
				$list = $('#locations-list');
			
			if(!beer){
				$list
					.hide()
					.after('<div id="no-beer-found"></div>');

				var $otherBeers = $('<ul>').append($.map(locator.beersById,function(b,i){
					return '<li><a href="/locator/' + b.id  + '">' + b.name + '</a> <small>('+ b.abv +'% abv)</small></li>';
				}).join(''));

				$('#no-beer-found')
					.append($otherBeers)

				$('body').removeClass('loading');
				return;
			}

			var $ajax = $.ajax({
				beforeSend:function(xhr, settings){
					settings.distance = distance;
				},
				context:this,
				data:{
					beer:beer,
					distance:distance,
					lat:position.coords.latitude,
					long:position.coords.longitude
				},
				success:function(response, textStatus, xhr){
				
					var locator = this;;

					if(!!response.results.length){
						$('#no-beer-found').remove();
						$list.show();

						$.each(response.results,function(i, result){
							var $item = locator.createListItem(result);

							locator.geocodeAddr(result);
							setTimeout(function(){
								$list.append($item.fadeIn());
							},i * 250);
							
						});
					}
					else if(distance < maxDistance){
						locator.findBeer(position, distance * 2);
					}
					else{
						var be = this.BEER;
						$list
							.hide()
							.after([
								'<div id="no-beer-found"><dl><dt class="h4">Availability:</dt><dd>',
									!!be.availabilities.length ? be.availabilities.join(', ') : 'Check back soon',
									'</dd></dl><p>',
										be.name, 
										' is not available within ', 
										maxDistance, 
										' miles of your location.<br/>Check out one of the other great Avery beers:</p></div>'
							].join(''))
						var $otherBeers = $('<ul>').append($.map(locator.beersById,function(b,i){
							if(be.id !== b.id){
								return '<li><a href="/locator/' + b.id  + '">' + b.name + '</a> <small>('+ b.abv +'% abv)</small></li>';
							}
						}).join(''));

						$('#no-beer-found')
							.append($otherBeers)
					}
				},
				url:base
			}).then(function(){
				$('body').removeClass('loading');
			});
		},

		geocodeAddr:function(result){
			var KEY = 'AIzaSyCecj5dwIl4_zWPH9GwY_kOPDMJK3Z7fZg',
				address = result.address,
				base = 'https://maps.googleapis.com/maps/api/geocode/json?',
				addr = [address.street, address.city, address.state].join(', ')
				url = [base,'address=',addr,'&key=',KEY].join('');

			$.getJSON(url)
				.then($.proxy(this.plotLocation, this, result));
		},

		plotLocation:function(establishment,response){
			if(response.status === 'OK'){
				var map = this.map,
					result = response.results[0],
					address = result.formatted_address,
					coords = result.geometry.location,
					content = ['<p>', address, '</p>'],
					className = this._removeSpaces(establishment.name);
					avery = L.icon({
						iconUrl: '/images/map-marker-avery.svg',
						shadowUrl: '/images/marker-shadow.png',
						iconSize:[25, 41], // size of the icon
						iconAnchor:[25, 41], // point of the icon which will correspond to marker's location
						popupAnchor:[-10, -30], // point from which the popup should open relative to the iconAnchor
						className:className
					});

				this.MARKERS[className] = [coords.lat, coords.lng];

				var marker = L.marker([coords.lat, coords.lng],{ 
					icon: avery,
					alt:address,
					title:address,
					riseOnHover:true
				 })
					.addTo(map);
					
			}
			else{
				console.error(response.status);
			}
		},

		getLocation:function(){
			var locator = this;
			if ('geolocation' in navigator) {
				/* geolocation is available */
				var position = {
						coords: {
							accuracy :20,
							altitude:null,
							altitudeAccuracy:null,
							heading:null,
							latitude:40.0168866,
							longitude:-105.2267035,
							speed:null
						}
					};
					// We're hard coding location because chrome won't let us get location over http (which we need for heroku)
				//navigator.geolocation.getCurrentPosition(function(position) {
					locator.initMap(position);
					locator.findBeer(position);
				//});
			} else {
				/* geolocation IS NOT available */
				console.error('Geolocation not supported');
			}
		},
		mapAllBeers:function(){
			var idDict= {},
				nameDict = {};

			$.each(this.ALL_BEER,function(i,beer){
				var name = beer.name,
					id = beer.id;

				idDict[id] = beer;
				nameDict[name] = beer;
			});

			this.beersById = idDict;
			this.beersByName = nameDict;
		},

		createListItem:function(result){
			var address = [result.address.street, result.address.city, result.address.state].join(', ');
			var formattedPhoneNumber = locator.formatPhone(result.phone);
			
			additionalBeers = function(beers) {
				if(beers.length){
					var content = ['<dt>Additional beer:</dt>\n<dd><ul>'],
						items = $.map(beers,function(beer,i){
							var name = beer.name;

							if(locator.beersByName[beer.name]){
								var beer = locator.beersByName[beer.name];
								name = '<a href="/stache/' + beer.id  + '">' + beer.name + '</a> <small>('+ beer.abv +'% abv)</small>'
							}

							return '<li>' + name + '</li>'
						}).join('');

					content.push(items,'</ul></dd>');

					return content.join('');
				}
			},
			$item = $([
				'<li class="location"">',
					'<article>',
						'<h3 class="capitalize ', locator._removeSpaces(result.name) ,'">',
							result.name.toLowerCase(),
						'</h3>',
						'<dl>',
							'<dt>Address:</dt>',
							'<dd class="capitalize">', address.toLowerCase(), '</dd>',
							'<dt>Phone:</dt>',
							'<dd><a href="tel:', result.phone ,'">', formattedPhoneNumber,'</a></dd>',
							additionalBeers(result.additional_beers),
						'</dl>',
					'</article>',
				'</li>'
			].join(''));

			return $item;
		},

		_removeSpaces:function(str){
			return str.toLowerCase().split(/[^A-Za-z\&]/).join('-');
		},

		formatPhone:function(phoneString){
			var editedNum = phoneString;

			editedNum = editedNum.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1) $2-$3');
			// console.log("editedNum: ", editedNum);

			return editedNum;
		},

		getParameterByName: function(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
	};

	var locator = new Locator();
	locator.init();
})();