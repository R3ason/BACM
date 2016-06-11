


var HipsterDictionary = (function(Window, undefined ){

    var beerApiUrl = 'http://apis.mondorobot.com/beers/';
    
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
        var href = $(this).attr("href");
        var beerId = href.substr(href.lastIndexOf('/') + 1);
        callBeerApi(beerId, populatePageAssets);
    }
    
    function cacheElements() {
        this.beerName = $(this).find('#beerName');
        this.beerLabel = $(this).find('#beerLabel');
        this.beerStyle = $(this).find('#beerStyle');
        this.abv = $(this).find('#beerName');
        this.description = $(this).find('#description');
        this.generatedDescription = $(this).find('#generatedDescription');
        this.location = $(this).find('#location');
    }

    function callBeerApi(beerId, callback) {
        $.ajax({
            method: "get",
            url: beerApiUrl + beerId,
            dataType: "json"
        })
        //.done(callback(data));
        .done(function(data)
        {

        });
    }

    function populatePageAssets(data)
    {
        this.beerName.text(data.name);
        this.beerLabel.attr('src', data.label_image.original);
        this.beerStyle.text(data.style);
        this.abv.text(data.abv);
        this.description.text(data.description);
    }
    return {
        GenerateDescription: generateDescription,
        Init: init
    };
})(window);

HipsterDictionary.Init();

