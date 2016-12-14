// this will make multiple api calls to get > 10 records
// I still have to figure out how to merge the results into 1 nice neat object
// or deal with an object of the result objects





$(document).ready(function(){
	// Eventually we'll need to write some javascript to populate these variables from the html form.
	// Right now, just testing them manually.
	var apiKey = "62edb78d7ae94fd7846ceea0c4a8fcad";
	var term = "digital rights"; // The search-term; corresponds to parameter 'q'.
	var yearStart = "2012"; // the year to put into parameter 'begin-date'. 
	var yearEnd = "2013"; // the year to put into parameter 'end-date'.
	var params = {}; // we can build the complete url dynamically using this variable. See 'if statements' below.
	var articlesNeeded = 25;  // this will need to change via user input
	var pagesNeeded = 0;
	var partialPage = 0;
	var requestedArticles = [];
	var result = {};
	var tempresult = {};

	var p = 0;  // this will increment for each page requested - each page = 10 articles	

	pagesNeeded = articlesNeeded/10;
	partialPage = articlesNeeded%10;
	if (partialPage === 0) {
		pagesNeeded--
	}

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




	// for (i=0; i<pagesNeeded; i++){


	// build the complete url based on the user's input.
		
		url += '?' + $.param(params)+'&page='+ p;
		
		// url += '?' + $.param(params)
		
		console.log(url);

		getNYTpages();
		
function getNYTpages(){
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function(result) {
		// Logging the entire response object so we can reference it during the development process.
	
		// Iterating through the array called 'docs' (it's in the response object) in order to pull out the 
		// properties we wish to display.
		// At this point, just console-logging the value of the property called headline.main, which is
		// the title of each article.
		// Eventually output of this loop should target the appropriate html/css IDs, etc.
// 		var i = 0;
// 		var j = 0;
// 		console.log("length = " + (result.response.docs).length);


// 		if (p == 0) {  // first time around requestedArticles is empty
// 			for (j=0; j<(result.response.docs).length; j++) {
// 				// console.log(result.response.docs[i].headline.main);
// 				requestedArticles = result.response.docs
// 			}	
// 		}
// 		else {  
// 			for (j=requestedArticles.length; (j < requestedArticles.length + 10  || j == articlesNeeded); j++ ) {
// 				requestedArticles[j] = result.response.docs[j-10]
// 			}
// 		}
// console.log("results = " + result.response.docs)

// console.log("requestedArticles = " + requestedArticles)
debugger
		
		requestedArticles.push(result);

		console.log("p = " + p);
		console.log("requestedArticles = " + requestedArticles[p]);
		
		p++;

		if (p < pagesNeeded){
			url += '?' + $.param(params)+'&page='+ p;
			console.log(url);
			getNYTpages();
		}


		}).fail(function(err) {
			throw err;
		});


}


}); // document.ready





