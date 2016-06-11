


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

    var templates = {
        
    };

    function generateDescription() {
        return "This beer is so dank I could slap your mom!";
    };

    return {
        GenerateDescription: generateDescription
    };
})(window);

