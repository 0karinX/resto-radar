"use strict";

var restoRadarUtils = function() {
	
	var loadingCurtain = $('#loading-screen-popup');

	function saveToLocStore(key, value){

		if(typeof(Storage) != null) {
            localStorage.setItem(key, JSON.stringify(value));           
        }
	}

	function getFromLocStore(key){

		if(typeof(Storage) != null) {
           return localStorage.getItem(key);     
        }

        return undefined;
	}

	function goToPage(url, options){

		// go to page
		$(':mobile-pagecontainer').pagecontainer('change', url, options);
	}

	function summonLoadingCurtain() {

		loadingCurtain.popup( "open" );
	}

	function destroyLoadingCurtain() {

		loadingCurtain.popup( "close" );
	}

	return {
		saveToLocStore 			: saveToLocStore,
		getFromLocStore			: getFromLocStore,
		goToPage				: goToPage,
		summonLoadingCurtain 	: summonLoadingCurtain,
		destroyLoadingCurtain	: destroyLoadingCurtain
	};
}();