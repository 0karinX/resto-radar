"use strict";

var scanResult = function() {

	var resultListView 	= '#results-listview',
		itemPageX 		= 'item-page.html';

	function init(data) {
		attachListenerToListView();
		displayResult();
	}
	
	function displayResult() {

		// get the data from local storage
		var resultData = restoRadarUtils.getFromLocStore('scanResult');
		formatResultItem(JSON.parse(resultData));
	}

    function formatResultItem(result) {

    	var currentResto = null,
    		currentRow	 = '',
    		resultList 	 = $(resultListView);

    	for(var ctr = 0, len = result.restaurants.length; ctr < len; ctr++) {

    		currentResto 	= result.restaurants[ctr].restaurant;
    		currentRow 		= '<li>'+ 
					    			'<a href="#">' +
					    					'<h2>' + currentResto.name + '</h2>' +
					    					getStyleForRating(currentResto.user_rating) +
					    					getStyleForCost(currentResto.average_cost_for_two) + 
				
									'</a>' +
							  '</li>';

			currentRow = $(currentRow);

			attachVitalDataToRow(currentRow, currentResto);    		
    		currentRow.appendTo(resultList);
    	}

    	resultList.listview( "refresh" ); // refresh whenever we manipulate data.
    }

    function attachListenerToListView () {

		$(resultListView).off('vclick', 'a').on('vclick', 'a', function(event) {

			resultRowHandler(event);
		});
    }

    function attachVitalDataToRow( row, data) {

    	row.data('rowinfo', data);

    	return row;
    }

  	function getStyleForRating(rating){

  		 var ratingPhrase = '<p> Rating: ';

		if(0 < rating.aggregate_rating)
			ratingPhrase +=  '<span style="color: #' + rating.rating_color +'">' + rating.aggregate_rating + ' / 5' + '</span>';
		else
			ratingPhrase += 'Not Rated';

		return ratingPhrase + '</p>';
	}

  	function getStyleForCost(cost){

  		 var costPhrase = '<p>Avg. Cost: ';

		if(0 < cost)
			costPhrase += cost + ' for 2';
		else
			costPhrase += 'No cost available';

		return costPhrase + '</p>';
	}

	function resultRowHandler(event){

		var rowdata = $(event.target).parents('li').data('rowinfo');

		restoRadarUtils.saveToLocStore('chosenResto', rowdata);
    	restoRadarUtils.goToPage(itemPageX, restoRadarConfig.getDefaultOptions());
	}

	return {
		init			: init,
		displayResult	: displayResult
	};
}();