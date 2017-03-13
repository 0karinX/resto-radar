"use strict";

var itemPage = function() {

	var pageHeader 			= '#item-page-header-title',
		itemAddressField 	= '#item-page-address',
		itemRatingField		= '#item-page-rating',
		itemAvgCostField	= '#item-page-avg-cost',
		itemPicField		= '#item-pic-field',
		contactsOpenTrigger	= '#contacts-open-trigger',
		contactsModalPage 	= 'contacts-modal.html',
		item 				= null;

	function init(data) {
		initVars();
		registerListeners();
		displayItem();
	}

	function initVars() {
		item = JSON.parse(restoRadarUtils.getFromLocStore('chosenResto')); // get the data from previous page.
	}
	
	function displayItem() {
		populateFields(item);
	}

	function populateFields(item) {
		changeHeaderName(item);
		changeAddress(item);
		changeAvgCost(item);
		changeRating(item);
		changePicture(item);
	}

	function changeHeaderName(item) {

		$(pageHeader).html(item.name);
	}

	function changeAddress(item) {

		var address = item.location.address;
		$(itemAddressField).html(address);
	}

	function changeRating(item) {
		var rating = item.user_rating.aggregate_rating;

		$(itemRatingField).html(rating + ' / 5');
	}

	function changeAvgCost(item) {

		$(itemAvgCostField).html(item.average_cost_for_two);
	}

	function changePicture(item) {
		$(itemPicField).prop('src', item.featured_image);
	}

	function showContacts() {
		contactsModal().showModal();
    }  

    function registerListeners() {

    	$(contactsOpenTrigger).off('vclick').on('vclick', function() {
    		showContacts();
    	});
    }

	return {
		init : init
	};
}();