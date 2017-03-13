'use strict';

var restoLocator = function() {

	// default constants
	var DEF_SEARCH_RAD 			= 250, 	// default search radius is 250m
		ZOMATO_API_URL			= {		// collection of zomato URLs.
			ULTIMATE_SEARCH : 'https://developers.zomato.com/api/v2.1/search'
		},
		SCAN_RESULT_PAGE_ID		= "#scan-results";

	function getListOfNearbyPlacesByGeolocation(searchLocationRadius) {
        // by default implementation, this will send an ajax request to zomato.
        getCurrentUserPosition(searchLocationRadius);
    }

    function getListOfPlacesByCoords() {
    }

    function sendAjaxToPlacesStore(lat, lon, radius){

    	var radiusToUse = radius;

    	if(null == radiusToUse || radiusToUse.trim().length == 0)
    		radiusToUse = window.restoRadarConfig.getDefaultSearchRadius();

    	$.ajax({
		        type: "GET",
		        url: ZOMATO_API_URL.ULTIMATE_SEARCH + '?' + $.param({
		           lat 		: lat,
		           lon 		: lon,
		           radius 	: radiusToUse,
		           count	: window.restoRadarConfig.getDefaultSearchCount()
		        }),
		        contentType: "application/json",
		        headers: {
		        	'user-key' : window.restoRadarConfig.getZomatoApiKey()
		        },
		        dataType: "json"
			})
			.done(function(data) {
    			showRestoScanResults(SCAN_RESULT_PAGE_ID, data);
    		})
	    	.fail(function() {

	    		// display error page here.
	    		alert('Radar scan failed, please try again.');
	    	})
	    	.always(function() {
	    		restoRadarUtils.destroyLoadingCurtain(); //wreck blinds
	    	});
    }

    function showRestoScanResults(resultScanPageID, result){

    	// save to localStorage via utils.
    	restoRadarUtils.saveToLocStore('scanResult', result);
    	restoRadarUtils.goToPage('scan-results.html', restoRadarConfig.getDefaultOptions());
    }

    function getCurrentUserPosition(searchRadius) {
    	// summon blinds
    	restoRadarUtils.summonLoadingCurtain();

        navigator.geolocation.getCurrentPosition(

            function(position){
                // success function
                sendAjaxToPlacesStore(position.latitude, position.longitude, searchRadius);
            },
             function(positionError){
                // error function
                restoRadarUtils.destroyLoadingCurtain(); //wreck blinds
                alert('Error while getting your current position, please try again.');
            }
        )
    }

    return {

    	getListOfNearbyPlacesByGeolocation 	: getListOfNearbyPlacesByGeolocation,
    	getListOfPlacesByCoords 			: getListOfPlacesByCoords
    }
};