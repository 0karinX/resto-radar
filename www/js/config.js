var restoRadarConfig = function() {

	var ZOMATO_API_KEY 		= '' // please get your key at zomato.com.. it's free,
		DEFAULT_SEARCH_RAD	= 100, // meters
		DEFAULT_SEARCH_COUNT= 50,
		GOOGLE_API_KEY		= '',
		DEFAULT_OPTIONS 	= {
			changeHash 		: true
		};

	var SMS_BOT_OPTIONS = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

	return {

		getDefaultSearchCount : function() {
			return DEFAULT_SEARCH_COUNT
		},
		getDefaultSearchRadius : function() {
			return DEFAULT_SEARCH_RAD;
		},
		getZomatoApiKey : function () {
			return ZOMATO_API_KEY;
		},

		getDefaultOptions : function () {

			return DEFAULT_OPTIONS;
		},

		getDefaultSmsOptions :  function () {
			return SMS_BOT_OPTIONS
		},

		getGoogleApiKey : function () {
			return GOOGLE_API_KEY;
		}
	}
}();