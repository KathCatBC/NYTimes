// These variables are meant to correspond with the search fields which we'll be setting-up in html.
// Also, at this point the 'for-loop' is populating an array with objects

// but once we have divs, IDs, etc., I think we'll be able to make use of this scaffolding to send
// the output of our choice to the appropriate html elements on screen.
//



// this will make multiple api calls to get > 10 records


$(document).ready(function(){
	// Eventually we'll need to write some javascript to populate these variables from the html form.
	// Right now, just testing them manually.
	// var apiKey = "62edb78d7ae94fd7846ceea0c4a8fcad";   // Matt's API key
	var apiKey = "aae85752c55d4facbe370489613d187b";   // Kathleen's API Key
	var term = "digital rights"; // The search-term; corresponds to parameter 'q'.
	
	var yearStart = "2012"; // the year to put into parameter 'begin-date'. 
	var yearEnd = "2013"; // the year to put into parameter 'end-date'.
	var params = {}; // we can build the complete url dynamically using this variable. See 'if statements' below.
	var articlesNeeded = 45;  // this will need to change via user input
	var pagesNeeded = 0;  // this is actually the number of the highest page number we need.
	var partialPage = 0;  // used to calc pages in case user need # that is not a multiple of 10
	var requestedArticles = [];
	var result = {};

	var recordCount = 0; // used for pushing article info into the requestedArticles array
	var p = 0;  // this will increment for each page requested - each page = 10 articles	

	pagesNeeded = Math.floor(articlesNeeded/10);   // this will calculate the number
	partialPage = articlesNeeded%10;				// of pages we need to get
	if (partialPage === 0) {						// if the user request 35 articles we get
		pagesNeeded--								// 40.

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

		getNYTpages();  // call the function to get the articles
		
		function getNYTpages(){       // made this into a function so it can be called 
			$.ajax({					// the second call happens after the first has finished 
				url: url,
				method: 'GET',
			}).done(function(result) {
		
			var j = 0;  // for looping thru the results

			// This will loop thru all the articles retrieved and push parts into an array of objects we don't have to display all the articles retrieved but deal with that on the front end instead of the backend.  Right now it just captures headline and web_url.  


			
			var weburlArticle;   // these are not really needed but make the code easier to read
			var headlineArticle;


			// this should work to add only enough records to the array - but I am getting too many 429 errors.  So I am taking a break to work on my other homework.

			// we still need to decide which fields to extract & show the user.

			for (j=0; (j<(result.response.docs).length && recordCount < articlesNeeded); j++) {
				headlineArticle = result.response.docs[j].headline.main;				
				weburlArticle = result.response.docs[j].web_url;
				requestedArticles.push({id: recordCount, headline: headlineArticle, weburl:weburlArticle})  //pushing the fields into the array
				recordCount ++  // when I did not use record count the same record was pushed into the array - end up with an array of 10 of the same objects
			}	
				
			console.log("article array:  ")
			console.log(JSON.stringify(requestedArticles))  // this is our array of objects we want to display

			p++;    // increment p - p is the page number to retrieve
			if (p <= pagesNeeded){      // if we still need more pages
				url += '?' + $.param(params)+'&page='+ p;   // call the function getting the next page.
				console.log(url);
				setTimeout(getNYTpages, 1000);

			}


		}).fail(function(err) {
			throw err;
		});


}
		
}); // document.ready
