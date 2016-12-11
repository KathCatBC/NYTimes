// Hi guys! I only mean this as a starting point——please do feel free to edit, refactor, (or completely re-do) it!
// These variables are meant to correspond with the search fields which we'll be setting-up in html.
// Also, at this point the 'for-loop' is just outputting documents' headlines to the console,
// but once we have divs, IDs, etc., I think we'll be able to make use of this scaffolding to send
// the output of our choice to the appropriate html elements on screen.
//
// The problem 'how to dictate quanity of records to display' has not been addressed, yet.
//
// The above comments are valid as of 5:30pm on 12/11. Please delete/re-write these comments as you see fit. :-)

$(document).ready(function(){
	// Eventually we'll need to write some javascript to populate these variables from the html form.
	// Right now, just testing them manually.
	var apiKey = "62edb78d7ae94fd7846ceea0c4a8fcad";
	var term = "digital rights"; // The search-term; corresponds to parameter 'q'.
	var recordCount = ""; // The quantity of records to display. NOTE: NYTimes api DOES NOT accept this as a parameter.
	var yearStart = "2012"; // the year to put into parameter 'begin-date'. 
	var yearEnd = "2013"; // the year to put into parameter 'end-date'.
	var params = {}; // we can build the complete url dynamically using this variable. See 'if statements' below.

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; // the base url to which we can add parameters/

	// we'll always need the apiKey in the url.
	params['api-key'] = apiKey;
	// if the user sets a value for the given parameter, then include that parameter in the url.
	if (term != "") {
		params['q'] = term;
	}
	if (yearStart != "") {
		params['begin_date'] = (yearStart + '0101');
	}
	if (yearEnd != "") {
		params['end_date'] = (yearEnd + '1231');
	}
	// console.log(params);

	// build the complete url based on the user's input.
	url += '?' + $.param(params);
	// console.log(url);


	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(result) {
		// Logging the entire response object so we can reference it during the development process.
		console.log(result.response);

		// Iterating through the array called 'docs' (it's in the response object) in order to pull out the 
		// properties we wish to display.
		// At this point, just console-logging the value of the property called headline.main, which is
		// the title of each article.
		// Eventually output of this loop should target the appropriate html/css IDs, etc.
		for (var i=0; i<(result.response.docs).length; i++) {
			console.log(result.response.docs[i].headline.main);
		}

		// NOTE: We still need to establish a way to make use of the 'recordCount' variable, so that the user can
		// choose how many items we display. For more about how to do this, see: "Pagination" section at 
		// https://developer.nytimes.com/article_search_v2.json#/README

	}).fail(function(err) {
		throw err;
	});
}); // document.ready




