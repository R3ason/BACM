


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
        'The {adjective} qualities of this {name} make it totally {adjective}'
    ];

    function sentencePolisher(template) {
        //Insert Beer Name
        template = template.replace('{name}', beerObject.name);

        //Populate Adjectives

        //Build Adjective List
        var adjectiveList = [];
        //for(var i = 0; i < )
        template = template;
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

