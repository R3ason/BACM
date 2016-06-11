


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
		]
	};

	var templates = [
		'This {name} is so {adjective}',
		'The {adjective} qualities of this {name} make it totally {adjective}',
		"The {hop} hops in my {name} really add to the {category}, {adjective} flavors.",
		"{name}: {adjective} artisinal disrupter extraordinaire!",
		"{hop} hops enhance the matchless aroma and {adjective} essence.",
		"I love embibing {name} with my {pairings} routine.  The {adjective} with the {malt} adds incredible mouth feel!",
		"Mucho gusto from the {adjective} {hop} hops  artfully mingle with the {yeast} to create a uniquely supreme and {adjective} experience.",
		"Premium nuance from the playful balance of {adjective} hops aroma with the {malt} addition make my {name} from Avery a glorious palate pleaser.",
		"No FOMO for the YOLO thanks to Avery and my {name} with the totes killer, {adjective} {category} flavor!",
		"Where else can you find a {malt} malt paired with a {hop} hop, but Avery?  Artisan before those kids even knew what it meant."
		"Where else can you find a {malt} malt paired with a {hop} hop, but Avery?  Artisan before those kids even knew what it meant.",
		'The {adjective} qualities of this {name} make it totally {adjective}'
	];

	function sentencePolisher(template) {
		//Insert Beer Name
		template = template.replace('{name}', beerObject.name);

		//Populate Adjectives

		//Build Adjective List
		var adjectiveList = [];
		for(var i = 0; i < partOfSpeech.adjective.length; i++) {
			var category = beerObject[partOfSpeech.adjective[i]];
			if(category) {
				adjectiveList = adjectiveList.concat(category);
			}
		}
		template = template;
		debugger;
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
		beerElements.updateDescriptionLink = rootElement.find('a');
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
		
	}
	return {
		GenerateDescription: generateDescription,
		Init: init
	};
})(window);

HipsterDictionary.Init();

