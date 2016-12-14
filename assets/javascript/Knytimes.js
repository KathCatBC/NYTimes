// These variables are meant to correspond with the search fields which we'll be setting-up in html.
// Also, at this point the 'for-loop' is just outputting documents' headlines to the console,
// but once we have divs, IDs, etc., I think we'll be able to make use of this scaffolding to send
// the output of our choice to the appropriate html elements on screen.
//
// The problem 'how to dictate quanity of records to display' has not been addressed, yet.
//
// The above comments are valid as of 5:30pm on 12/11. Please delete/re-write these comments as you see fit. :-)

// this will make multiple api calls to get > 10 records
// I still have to figure out how to merge the results into 1 nice neat object
// or deal with an object of the result objects





$(document).ready(function(){
	// Eventually we'll need to write some javascript to populate these variables from the html form.
	// Right now, just testing them manually.
	var apiKey = "62edb78d7ae94fd7846ceea0c4a8fcad";
	var term = "digital rights"; // The search-term; corresponds to parameter 'q'.
	var recordCount = ""; // The quantity of records to display. NOTE: NYTimes api DOES NOT accept this as a parameter.
	var yearStart = "2012"; // the year to put into parameter 'begin-date'. 
	var yearEnd = "2013"; // the year to put into parameter 'end-date'.
	var params = {}; // we can build the complete url dynamically using this variable. See 'if statements' below.
	var articlesNeeded = 15;  // this will need to change via user input
	var pagesNeeded = 0;
	var partialPage = 0;
	var requestedArticles = [];
	var result = {};
	var tempresult = {};

	var p = 0;  // this will increment for each page requested - each page = 10 articles	

	pagesNeeded = Math.floor(articlesNeeded/10);   // this will calculate the number
	partialPage = articlesNeeded%10;				// of pages we need to get
	if (partialPage === 0) {						// if the user request 35 articles we get
		pagesNeeded--								// 40
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
	


		
		url += '?' + $.param(params)+'&page='+ p;   // added the page number we need to the URL
		
		
		console.log(url);  // instead of console logging params - this will console log params + page data

		getNYTpages();
		
		function getNYTpages(){       // made this into a function so it can be called 
			$.ajax({					// the second call happens after the first has finished 
				url: url,
				method: 'GET',
			}).done(function(result) {
		
			var j = 0;  // for looping thru the results

		// This will loop thru all the articles retrieved and push parts into an array of objects we don't have to display all the articles retrieved but deal with that on the front end instead of the backend.  Right now it just captures headline and web_url.  This still needs more testing to make sure the array is populated correctly

debugger
			var newArticle = {}
				for (j=0; j<(result.response.docs).length; j++) {
					console.log(result.response.docs[j].headline.main);
					newArticle.headline = result.response.docs[j].headline.main
					newArticle.weburl = result.response.docs[j].web_url
					requestedArticles.push(newArticle)
					console.log(newArticle)
				}	
		
				
			p++;    // increment p - p is the page number starting a zero

			if (p < pagesNeeded){      // if we still need more pages
				url += '?' + $.param(params)+'&page='+ p;   // call the function getting the next page.
				console.log(url);
				getNYTpages();
			}

		// NOTE: We still need to establish a way to make use of the 'recordCount' variable, so that the user can
		// choose how many items we display. For more about how to do this, see: "Pagination" section at 
		// https://developer.nytimes.com/article_search_v2.json#/README


		// I think we deal with showing the correct number on the front end - as long as we don't get any errors the records we retrieve are >= recordCount

		}).fail(function(err) {
			throw err;
		});


}

	console.log(requestedArticles)  // this is our array of objects we want to display

}); // document.ready





