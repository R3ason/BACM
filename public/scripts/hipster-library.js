


var HipsterDictionary = (function(Window, undefined ){

	var beerApiUrl = 'http://apis.mondorobot.com/beers/';
	var rootElement;
	var beerElements = {};
	var beerObject = {};

	var loadingMessages = [
		'consulting hipsters...',
		'growing hipster beard...',
		'summoning hipster...',
		'drinking beer...',
		'grooming moustache...',
		'beeeeeeeer...'
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
        "amatory",
        "boorish",
        "bleeding edge",
        "calamitous",
        'corpulent',
        "comely",
        "defematory",
        "dilatory",
        "dowdy",
        "efficacious",
        "egregious",
        "epic",
        "equanimous",
        "exclusive",
        "fulsome",
        "freemium",
        "groundbreaking",
        "gustatory",
        "heuristic",
        "hubristic",
        "jocular",
        "luminous",
        "meretricious",
        "noxious",
        "obtuse",
        "petulant",
        "pioneering",
        "quiescent",
        "redolent",
        "revolutionary",
        "ruminative",
        "sartorial",
        "sticky",
        "synergistic",
        "turbulent",
        "verdant",
        "voracious",
        "wheedling",
        "unbelievable",
        "unique",
        "zealous",
    ];

	var templates = [
		'This {name} is so {adjective}',
		'The {adjective} qualities of this {name} make it totally {adjective}',
		"The {hop} hops in my {name} really add to the {cat} , {adjective} flavors.",
		"{name}: {adjective} artisinal disrupter extraordinaire!",
		"{hop} hops enhance the matchless aroma and {adjective} essence.",
		"I love embibing {name} with my {pairings} routine.  The {adjective} notes along with the {malt} adds incredible mouth feel!",
		"Mucho gusto from the {adjective} {hop} hops  artfully mingle with the {yeast} yeast to create a uniquely supreme and {adjective} experience.",
		"Premium nuance from the playful balance of {adjective} hops aroma with the {malt} addition make my {name} from Avery a glorious palate pleaser.",
		"No FOMO for the YOLO thanks to Avery and my {name} with the totes killer, {adjective} {cat} flavor!",
		"Where else can you find a {malt} malt paired with a {hop} hop, but Avery?  Artisan before those kids even knew what it meant.",
		'The {adjective} qualities of this {name} make it totally {adjective}'
	];

	function sentencePolisher(template) {
		//Insert Beer Name
		var beerName = beerObject.name;
		if(template.indexOf('{name}') > 0) {
			beerName = beerName.replace('The ', '');
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

		exquisiteAdjectives = shuffle(exquisiteAdjectives).slice(-5);
		debugger;
		adjectiveList = adjectiveList.concat(exquisiteAdjectives);
		adjectiveList = shuffle(adjectiveList);

		//Build Noun List
		var nounList = [];
		for(var i = 0; i < partOfSpeech.noun.length; i++) {
			var category = beerObject[partOfSpeech.noun[i]];
			if(category) {
				nounList = nounList.concat(category);
			}
		}

		nounList = shuffle(nounList);

		//Build Hop List
		var hopList = [];
		for(var i = 0; i < partOfSpeech.hop.length; i++) {
			var category = beerObject[partOfSpeech.hop[i]];
			if(category) {
				hopList = hopList.concat(category);
			}
		}

		hopList = shuffle(hopList);

		//Build Pairing List
		var pairingList = [];
		for(var i = 0; i < partOfSpeech.pairings.length; i++) {
			var category = beerObject[partOfSpeech.pairings[i]];
			if(category) {
				pairingList = pairingList.concat(category);
			}
		}

		pairingList = shuffle(pairingList);

		//Build Category List
		var categoryList = [];
		for(var i = 0; i < partOfSpeech.cat.length; i++) {
			var category = beerObject[partOfSpeech.cat[i]];
			if(category) {
				categoryList = categoryList.concat(category);
			}
		}
		//debugger;

		categoryList = shuffle(categoryList);

		//Build Yeast List
		var yeastList = [];
		for(var i = 0; i < partOfSpeech.yeast.length; i++) {
			var category = beerObject[partOfSpeech.yeast[i]];
			if(category) {
				yeastList = yeastList.concat(category);
			}
		}

		yeastList = shuffle(yeastList);

		//Build Malt List
		var maltList = [];
		for(var i = 0; i < partOfSpeech.malt.length; i++) {
			var category = beerObject[partOfSpeech.malt[i]];
			if(category) {
				maltList = maltList.concat(category);
			}
		}

		maltList = shuffle(maltList);

		var templateArray = template.split(" ");
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

			template = templateArray.join(' ').replace(' ,', ',');
		} catch(err) {
			template = 'Good sir, you have confounded me and left me speechless. Enjoy your ' + beerObject.name;
		}

		return template;
	}

	function generateDescription() {
		var tCount = templates.length;
		var templateIndex = Math.floor(Math.random() * tCount) + 1;
		var selectedTemplate = templates[templateIndex - 1];
		var finalSentence = sentencePolisher(selectedTemplate)
		return finalSentence;
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
		beerElements.description = rootElement.find('#Description');
		beerElements.location = rootElement.find('#Location');
		beerElements.updateDescriptionLink = rootElement.find('#HipsterLink');
		beerElements.loadingDiv = $('div.loader');
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
		addMask(beerElements.description);
		setTimeout(function(){
			beerElements.description.text(generateDescription());
			removeMask(beerElements.description);
		}, 1500);
	}
	function callBeerApi(beerId, callback) {
		$.ajax({
			method: "get",
			url: beerApiUrl + beerId,
			dataType: "json"
		})
		.done(callback);
	}

	function populatePageAssets(data)
	{
		beerObject = data.beer;
		beerElements.beerName.text(beerObject.name);
		beerElements.beerLabel.attr('src', beerObject.label_image.original);
		beerElements.beerStyle.text(beerObject.style);
		beerElements.abv.text(beerObject.abv);
		beerElements.description.text(generateDescription());

		setTimeout(function() {
			beerElements.loadingDiv.hide();
		}, 1500);
		
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

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

	return {
		GenerateDescription: generateDescription,
		Init: init
	};
})(window);

HipsterDictionary.Init();

