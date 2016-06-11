


var HipsterDictionary = (function(Window, undefined ){

    var beerApiUrl = 'http://apis.mondorobot.com/beers/';
    var rootElement;
    var beerElements = {};
    
    var partOfSpeech = {
        "noun": [
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
        "This {name} is so {adjective}",
        "The {adjective} qualities of this {name} make it totally {adjective}"
    ];

    function sentencePolisher(template, beerProperties) {
        //Insert Beer Name
        template = template.replace('{name}', beerProperties.name);

        //Populate Adjectives

        //Build Adjective List
        var adjectiveList = [];
        //for(var i = 0; i < )
        template = template;
        return template;
    }

    function generateDescription(sBeerId) {
        var tCount = templates.length;
        var templateIndex = Math.floor(Math.random() * tCount) + 1;
        var selectedTemplate = templates[templateIndex - 1];
        var beerProperties = {
            id:"ipa",
            name: "IPA"
        };
        var finalSentence = sentencePolisher(selectedTemplate, beerProperties)
        return finalSentence;
    };

    function init()
    {
        cacheElements();
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
        var beer = data.beer;
        beerElements.beerName.text(beer.name);
        beerElements.beerLabel.attr('src', beer.label_image.original);
        beerElements.beerStyle.text(beer.style);
        beerElements.abv.text(beer.abv);
        beerElements.description.text(beer.description);
    }
    return {
        GenerateDescription: generateDescription,
        Init: init
    };
})(window);

HipsterDictionary.Init();

