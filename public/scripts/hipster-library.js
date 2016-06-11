


var HipsterDictionary = (function(Window, undefined ){

	var beerApiUrl = 'http://apis.mondorobot.com/beers/';
	var rootElement;
	var beerElements = {};
	var beerObject = {};
	var abbreviatedBeerName;

	// Twitter info
	var twitterHashtag = ' #AveryBeerstache';
	var twitterTruncate = '...';
	var tweetLength = 140;
	var twitterLinkLength = 24;

	var authorAdjectives = [
		'discerning',
		'hipster',
		'rugged',
		'confounded',
		'timid',
		'flamboyant',
		'disenchanted',
		'pugnacious',
		'prestigious'
	];

	var loadingMessages = [
		'consulting hipsters...',
		'growing hipster beard...',
		'summoning hipster...',
		'drinking beer...',
		'grooming moustache...',
		'beeeeeeeer...',
		'listening to a band you probably haven\'t heard of...',
		'Adding more flannel...',
		'riding my fixie...',
		'pausing my 45...',
		'lend me your beard...',
		'locating the closest hipster...',
		'dry-hopping your beer...'
	];

	var partOfSpeech = {
		'noun': [
			'hop_varieties',
			'dry_hop_varieties',
			'yeast_varieties',
			'malt_varieties'
		],
		'adjective': [
			'descriptors',
			'categories'
		],
		'hop': [
			'hop_varieties',
			'dry_hop_varieties'
		],
		'pairings': [
			'pairings'
		],
		'cat': [
			'categories'
		],
		'yeast': [
			'yeast_varieties'
		],
		'malt': [
			'malt_varieties'
		]
	};

	var exquisiteAdjectives = [
		'amatory',
		'americana',
		'bleeding edge',
		'corpulent',
		'comely',
		'dilatory',
		'efficacious',
		'epic',
		'equanimous',
		'exclusive',
		'fulsome',
		'freemium',
		'groundbreaking',
		'gustatory',
		'heuristic',
		'hubristic',
		'jocular',
		'luminous',
		'meretricious',
		'nostalgic',
		'obtuse',
		'pioneering',
		'quiescent',
		'redolent',
		'revolutionary',
		'ruminative',
		'sartorial',
		'sticky',
		'synergistic',
		'turbulent',
		'verdant',
		'voracious',
		'wheedling',
		'unbelievable',
		'unique',
		'zealous',
		'post-nouveau chic',
	];

	var templates = [
		'This {name} is so {adjective}',
		'The {adjective} qualities of this {name} make it totally {adjective}',
		'The {hop} hops in my {name} really add to the {cat} , {adjective} flavors.',
		'{name}: {adjective} artisinal disrupter extraordinaire!',
		'{hop} hops enhance the matchless aroma and {adjective} essence of this {adjective} {name}.',
		'I love embibing {name} during my " {pairings} " routine.  The {adjective} notes along with the {malt} malts add incredible mouth feel!',
		'Mucho gusto from the {adjective} {hop} hops in the {name} artfully mingle with the {yeast} yeast to create a uniquely supreme and {adjective} experience.',
		'Premium nuance from the playful balance of {adjective} hops aroma with the {malt} malt addition make my {name} from Avery a glorious palate pleaser.',
		'No #FOMO for the #YOLO thanks to Avery and my {name} with the totes killer, {adjective} , {cat} flavor!',
		'Where else can you find a {malt} malt paired with a {hop} hop, but in the Avery {name}?  {adjective} before those kids even knew what it meant.',
		'The {adjective} qualities of this {name} make it totally {adjective}',
        'Drinking {name} reminds me of a night of {adjective} fun and the kumquats we ate while gazing into the stars',
        'If Avery\'s {name} was a member of my preferred sex, I would definitely buy it dinner',
        'The {adjective} {hop} hops redefine the {cat} and make my {name} the best in the biz',
        'When I heard that Avery\'s {name} was so {adjective} I left my wife immediately to start brewing my own {cat} beers',
        'The {adjective} {hop} hops in the {name} reminds me of bathing in a pool with Merpeople',
        'You will really feel the {hop} hops in the {name} where it counts',
        'The {name} {cat} is so {adjective} that I will literally bathe my Pug in it',
        'I find that the {adjective} {hop} hops bring out the true {adjective} aroma in the {name}',
        'The only {cat} beer I\'ll drink is {name}. Unless the alternative was Organic and Gluten-free. Then I\'d think about it',
        'The Pope once said that the {hop} hops in the {name} are so {adjective} that it could "lit\'rally" be used to bless infants',
        'You literally can\'t find another {cat} beer like {name} anywhere.',
        'The {hop} hops and {adjective} taste make {name} so {adjective} that it will leave you speechless',
        'The {adjective} method Avery uses the {hop} hops in the {name} truly makes it a game changer',
        'Avery\'s {name} completely revolutionizes the " {cat} " category.',
        '{name}\'s {adjective} use of the aromatic {hop} hops to balance out the {adjective} yeast results in a {adjective} beer you can bring to your mother',
        'I have never seen the {yeast} ferment the way it does in the {name}. It is truly a {adjective} specimen',
        'The Avery {name} is the most important {cat} beer of the decade',
        'I often use the {adjective} {name} to lighten up before heading out and krumping for the evening',
        'It\'s so ironic that the {hop} hops and the {yeast} yeast in the {name} come together in such a {adjective} way.',
        'This {name} goes really well with " {pairings} "',
        'I\'ve associated {name} with " {pairings} " since before " {pairings} " was even a thing',
        'It strikes me as supremely {adjective} that the {noun} in the {name} even classifies as {cat} . It is obviously far more {adjective}',
        'I think Ayn Rand once said that this {name} is " {adjective} " and that we should all drink it',
        'The {noun} paired with " {pairings} " really rounds out the {hop} hops and {yeast} yeasts in the Avery {name}',
        'I took the {name} with me on my " {pairings} " trip and the {yeast} yeasts really got me going',
        'If I\'m not mistaken, I believe the {hop} hops in this {name} were grown by {adjective} monks in the Himalayas.',
        'The {malt} malt in this {name} has the perfect translucence for my vintage Polaroid selfies',
        'The {adjective} {noun} in my {name} really reminds me of this one foreign film I watched',
        'Avery\'s {name} used {malt} malt, {yeast} yeasts and a {noun} before they were even popular',
        'The iridesent {yeast} yeasts in the {name} provide a truly {adjective} olfactory to cranial experience',
        'The drinkability of this {name} is optimal when the {noun} {hop} hops are at the beginning of their season',
        'These {adjective} {malt} malt in my {name} are so {adjective} that they really make my beard glisten',
        'The {adjective} crafting of the {noun} and {noun} in this {adjective} {name} is truly {adjective}',
        'A {cat} style beer like this {name} was invented by {adjective} tiger tamers in Eastern Indiana',
        'The {yeast} yeast goes through a {adjective} process that is authentic to the {name}',
        'The artful collaboration of the {noun} {malt} malt and the {adjective} {noun} if {name} is really a critique of society',
        'The {yeast} yeast and {adjective} {hop} in {name} provide a whistfully {adjective} exposure to the {cat} beers',
        'Knowing the {adjective} relationship the brewer has with the {malt} malt makes me feel like I\'m really connecting with the {name}',
	];

	var errorMessages = [
		'Good sir, you have confounded me and left me speechless. Enjoy your {name}'
	];

	function sentencePolisher(template) {
		//Insert Beer Name
		var beerName = beerObject.name;
		abbreviatedBeerName = beerName.replace('The ', '');
		if(template.indexOf('{name}') > 0) {
			beerName = abbreviatedBeerName;
		}
		template = template.replace('{name}', beerName);

		//Populate Adjectives

		//Build Adjective List
		var adjectiveList = [];
		for(var i = 0; i < partOfSpeech.adjective.length; i++) {
			var category = beerObject[partOfSpeech.adjective[i]];
			if(category) {
				adjectiveList = adjectiveList.concat(category);
			}
		}

		exquisiteAdjectives = shuffleArray(exquisiteAdjectives).slice(-5);

		adjectiveList = adjectiveList.concat(exquisiteAdjectives);
		adjectiveList = shuffleArray(adjectiveList);

		//Build Noun List
		var nounList = [];
		for(var i = 0; i < partOfSpeech.noun.length; i++) {
			var category = beerObject[partOfSpeech.noun[i]];
			if(category) {
				nounList = nounList.concat(category);
			}
		}

		nounList = shuffleArray(nounList);

		//Build Hop List
		var hopList = [];
		for(var i = 0; i < partOfSpeech.hop.length; i++) {
			var category = beerObject[partOfSpeech.hop[i]];
			if(category) {
				hopList = hopList.concat(category);
			}
		}

		hopList = shuffleArray(hopList);

		//Build Pairing List
		var pairingList = [];
		for(var i = 0; i < partOfSpeech.pairings.length; i++) {
			var category = beerObject[partOfSpeech.pairings[i]];
			if(category) {
				pairingList = pairingList.concat(category);
			}
		}

		pairingList = shuffleArray(pairingList);

		//Build Category List
		var categoryList = [];
		for(var i = 0; i < partOfSpeech.cat.length; i++) {
			var category = beerObject[partOfSpeech.cat[i]];
			if(category) {
				categoryList = categoryList.concat(category);
			}
		}
		//debugger;

		categoryList = shuffleArray(categoryList);

		//Build Yeast List
		var yeastList = [];
		for(var i = 0; i < partOfSpeech.yeast.length; i++) {
			var category = beerObject[partOfSpeech.yeast[i]];
			if(category) {
				yeastList = yeastList.concat(category);
			}
		}

		yeastList = shuffleArray(yeastList);

		//Build Malt List
		var maltList = [];
		for(var i = 0; i < partOfSpeech.malt.length; i++) {
			var category = beerObject[partOfSpeech.malt[i]];
			if(category) {
				maltList = maltList.concat(category);
			}
		}

		maltList = shuffleArray(maltList);

		var templateArray = template.split(' ');
		//Todo [Ben]: popping WILL break this if there are more instances than in the array!!!
		try {
			for (var i = 0; i < templateArray.length; i++) {
				var currentItem = templateArray[i];
					switch(templateArray[i]) {
						case '{adjective}':
							templateArray[i] = adjectiveList.pop().toLowerCase();
							break;
						case '{noun}':
							templateArray[i] = nounList.pop().toLowerCase();
							break;
						case '{hop}':
							templateArray[i] = hopList.pop().toLowerCase();
							break;
						case '{pairings}':
							templateArray[i] = pairingList.pop().toLowerCase();
							break;
						case '{cat}':
							templateArray[i] = categoryList.pop().toLowerCase();
							break;
						case '{yeast}':
							templateArray[i] = yeastList.pop();
							break;
						case '{malt}':
							templateArray[i] = maltList.pop();
					}
			}

			template = templateArray.join(' ').replace(' ,', ',').replace(' .', '.').replace(' \'', '\'');

			// Remove extra spaces around quotes
			var quote = template.match(/\" (.*)\ "/)
			if(quote) {
				quote = quote.pop();
				template = template.replace('" ' + quote + ' "', '"' + quote + '"');
			}
		} catch(err) {
			var errorIndex = Math.floor(Math.random() * errorMessages.length)
			template = errorMessages[errorIndex];
		}

		template = template.replace('{name}', beerName);
		return template;
	}

	function generateDescription() {
		var tCount = templates.length;
		var templateIndex = Math.floor(Math.random() * tCount) + 1;
		var selectedTemplate = templates[templateIndex - 1];
		var finalSentence = sentencePolisher(selectedTemplate)
		return toTitleCase(finalSentence);
	};

	function init()
	{
		cacheElements();
		bindElements();
		var href = window.location.href;
		var beerId = href.substr(href.lastIndexOf('/') + 1);
		callBeerApi(beerId, populatePageAssets);
	}
	
	function cacheElements() {
		rootElement = $('.card');
		beerElements.beerName = rootElement.find('#BeerName');
		beerElements.beerLabel = rootElement.find('#BeerLabel');
		beerElements.beerStyle = rootElement.find('#BeerStyle');
		beerElements.abv = rootElement.find('#ABV');
		beerElements.description = rootElement.find('.hipster-text');
		beerElements.author = rootElement.find('#beerSignature');
		beerElements.location = rootElement.find('#Location');
		beerElements.updateDescriptionLink = rootElement.find('#HipsterLink');
		beerElements.loadingDiv = $('div.loader');
		beerElements.tweetButtonHolder = $('#tweetButtonHolder');
		beerElements.relatedLinksList = $('ul.relatedBeers');
	}

	function bindElements() {
		beerElements.updateDescriptionLink.on('click', $.proxy(handleDescriptionUpdate, this));
	}

	function addMask(element) {
		var loadingIndex = Math.floor(Math.random() * loadingMessages.length) + 1;
		element.text(loadingMessages[loadingIndex - 1]);
	}

	function removeMask(element) {
		//
	}

	function handleDescriptionUpdate(e) {
		e.preventDefault();

		$(e.currentTarget).attr('disabled', 'disabled');
		beerElements.author.text('');
		addMask(beerElements.description);
		setTimeout(function(){

			setHipsterDescriptionText();

			removeMask(beerElements.description);
		}, 1500);
	}
	function callBeerApi(beerId, callback) {
		var xhr = $.ajax({
			method: 'get',
			url: beerApiUrl + beerId,
			dataType: 'json'
		})
		.done(callback);
	}

	function populatePageAssets(data)
	{
		beerObject = data.beer;
		
		beerElements.beerName.text(beerObject.name);
		beerElements.beerLabel.attr('src', beerObject.label_image.original);
		beerElements.beerStyle.text(beerObject.style || "--");
		beerElements.abv.text(beerObject.abv ? beerObject.abv + '%' : "--");

		abbreviatedBeerName = beerObject.name.replace('The ', '');

		setHipsterDescriptionText();

		generateRelatedLinks();

		setTimeout(function() {
			beerElements.loadingDiv.hide();
		}, 1500);
		
	}

	function setHipsterDescriptionText() {
		var descrip = generateDescription();
		beerElements.description.text(descrip);
		var authorDesc = shuffleArray(authorAdjectives).pop();
		beerElements.author.text('~ A ' + authorDesc + ' ' + abbreviatedBeerName + ' drinker');

		generateTwitterButton(descrip);

		beerElements.updateDescriptionLink.removeAttr('disabled');
	}

	function generateTwitterButton(descrip) {
		var longDescription = descrip;
		var fullUrl = 'http://t.co/stache/' + beerObject.id + '?desc=' + encodeURI(longDescription);

		descrip = descrip.substr(0, tweetLength - twitterHashtag.length - twitterTruncate.length - twitterLinkLength);
		descrip = descrip.length == tweetLength - twitterHashtag.length - twitterTruncate.length - twitterLinkLength
			? descrip + twitterTruncate
			: descrip;

		$('iframe').remove();
		beerElements.tweetButtonHolder.empty();
		var element = document.createElement('a');
		element.setAttribute('href', 'https://twitter.com/intent/tweet?hashtags=AveryBeerstache');
		element.setAttribute('class', 'twitter-share-button pull-right');
		element.setAttribute('style', 'margin-top:5px;');
		element.setAttribute('data-size' ,'large');
		element.setAttribute('data-text', descrip);

		element.setAttribute('data-url', fullUrl);
		element.setAttribute('data-related' ,'AveryBrewingCo,Mondo_Robot');
		beerElements.tweetButtonHolder.append(element);
		
		try {
			twttr.widgets.load();  //very important
		}
		catch(err) {
			console.log('Twitter is taking longer than normal to load...');
			var count = 0;
			var retry = setInterval(function() {
				count++;
				try {
					twttr.widgets.load();
				}
				catch(err) { }
				if(count > 5) {
					clearInterval(retry);
				}
			}, 250);
		}
	}

	function generateRelatedLinks() {
		beerElements.relatedLinksList.empty();
		if(beerObject.related_beers && beerObject.related_beers.length > 0) {
			var relatedBeers = beerObject.related_beers;
			for(var i = 0; i < relatedBeers.length; i++) {
				var listItem = $('<li><a href="' + relatedBeers[i].id + '">' + relatedBeers[i].name + '</a></li>');
				beerElements.relatedLinksList.append(listItem.clone());
			}
			$('nav > p').show();
		} else {
			$('nav > p').hide();
		}
	}

	function shuffleArray(array) {
		var currentIndex = array.length;
		var temporaryValue;
		var randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function toTitleCase(str)
	{
		return str.replace(
			/\w\S*/g,
			function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1);
			}
		);
	}


	return {
		GenerateDescription: generateDescription,
		Init: init
	};
})(window);

HipsterDictionary.Init();

