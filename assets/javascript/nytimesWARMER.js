// https://github.com/KathCatBC/NYTimes

$(document).ready(function(){
	var url = ""; // The url to use in the ajax call.
	var apiKey = "b29c6f530cde4cb2b7c6de45520eee27";
	var term = ""; // The search-term; corresponds to parameter 'q'.
	var yearStart = ""; // the year to put into parameter 'begin-date'. 
	var yearEnd = ""; // the year to put into parameter 'end-date'.
	var quantityRequested; // The quantity of articles requested by the user
	var params = {}; // we can build the complete url dynamically using this variable. See 'if statements' below.
	var page = 0;

	function queryApi() {
		url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";  // the base url to which we add parameters
		params['page'] = page; // sets the url's 'page' parameter equal to the counter-variable 'page'.
		url += '?' + $.param(params); // builds the url based on the user's input.
		console.log("calling api with url: " + url);

		console.log("Begindate param: " + params['begin_date']);
		console.log("Enddate param: " + params['end_date']);

	    $.ajax({
			url: url,
			method: 'GET',
		}).done(function(result) {
 			// log the entire response object so we can reference it during development.
			console.log(result);
			// Iterate over the array 'docs' (it's in the response object) and
			// (for now, we just) append each article headline to the body. Speak with Frank regarding
			// exactly what info we're gonna display, div IDs, etc. 
			for (var i=0; i<10; i++) {
					console.log('document number: ' + i + ' on page index: ' + (page));
					console.log(result.response.docs[i].headline.main);
					var item = ('<h2>' + (result.response.docs[i].headline.main) + '</h2>');
					$('body').append(item);
			} // end for i
			page++; // That page is done, so increment the counter variable 'page'.
			// IF there is a 'next page' ... WAIT 1 SECOND TO AVOID error429...
			if (page < (quantityRequested / 10)) {
				// ... THEN QUERY THE API FOR THE NEXT PAGE.
				setTimeout(queryApi, 1000);
			}

		}).fail(function(err) {
			throw err;
		}); // end of .fail;
	} // end of function queryApi()

	$('#searchButton').on('click', function(event){
		event.preventDefault(); // prevents form from submittimg http request/reloading page.
		term = $('#searchText').val().trim();
		quantityRequested = $('#recordsToRetrieve').val().trim();
		yearStart = $('#startYear').val().trim();
		yearEnd = $('#endYear').val().trim();
		console.log("Search term is: " + term);
		console.log("retrieve this many: " + quantityRequested);
		console.log(yearStart);
		console.log(yearEnd);

		// we'll always need the apiKey in the url.
		params['api-key'] = apiKey;
		// if the user sets a value for a given parameter, then include that parameter in the url.
		if (term != "") { params['q'] = term; }
		if (yearStart != "") { params['begin_date'] = (yearStart + '0101'); }
		if (yearEnd != "") { params['end_date'] = (yearEnd + '0101'); }

		queryApi();
	}); // on click
}); // document.ready





