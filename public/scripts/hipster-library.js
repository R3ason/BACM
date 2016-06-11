


var HipsterDictionary = (function(Window, undefined ){

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
        "The {adjective} qualities of this beer make it totally {adjective}"
    ];

    function sentencePolisher(template, beerProperties) {
        return template;
    }

    function generateDescription(sBeerId) {
        var tCount = templates.length;
        var templateIndex = Math.floor(Math.random() * tCount) + 1;
        var selectedTemplate = templates[templateIndex - 1];
        var beerProperties = {
            id:"ipa"
        };
        var sentence = sentencePolisher(selectedTemplate, beerProperties)
        return templates[templateIndex - 1];
    };

    return {
        GenerateDescription: generateDescription
    };
})(window);

