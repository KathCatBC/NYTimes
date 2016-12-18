// Kathleen, sorry this has no partialPage functionality, AGAIN. lol. You think we can
// add it to this document? Or, what do you think about howto 'merge' the two .js files.
// We could use your partialPage methodology here, or else need to move some stuff
// from here, over to the other file. Would you be up for handling that? Please,
// just let me know if I ought to get involved——I'll be available by Sunday evening. Hopefully,
// a reasonable, easy way to bring it all together will be apparent!! :-)
// 
// Also, I'm thinking out loud here... the way you were .push'ing everything into an
// array––is that right, you were building an array from the result object (whereas I am
// throwing straight to the screen)——I'm thinking array would be very useful, so that we
// can DISPLAY JUST 5 RECORDS.
// 
// So maybe we use the scaffolding below (which iterates the result object) to 
// push "article" arrays into a "holder" array. Once we've completed that, and filled 
// the holder array with all the arrays containing headline, byline, and url... then...
// to display the crap... we iterate over the length of the holder array. This way
// (i think?) the counter variable (i) of the "holder" loop can provide the numbering
// which Pavan's sample image shows.            (*You may have been trying to tell me this*)
// and a little inner loop (j, or whatever) can iterate over each document array, using
// jquery to .append <div>'s containing (i), the byline, and the headline/link to
// a $('div#articles') at the bottom of the body.
//
// Or something. Hey check out the year validation/error avoidance at lines 98 and 109!!!
//
// tl;dr urh, nevermind.


// ***** Note to self: Probably need to .empty() before each time we displayArticles.

// Please delete the shit above. ;-)

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
			// (for now, we just) append each article headline to the body.
			for (var i=0; i<10; i++) {
					console.log('document number: ' + i + ' on page index: ' + (page));
					console.log(result.response.docs[i].headline.main);
					// NEXT FEW LINES APPEND EACH headline TO THE BODY.
					// WE'LL NEED TO ALTER THIS TO INCLUDE THE byline AND index-number, 
					// AS WELL AS TO TURN THE headline INTO A HREF WHICH POINTS AT THE ARTICLE'S URL.
					var item = ('<h2>' + (result.response.docs[i].headline.main) + '</h2>');
					$('body').append(item);
			} // end 'for i'
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
		term = $('#searchText').val().trim(); // loads the search term from html form into a variable.
		quantityRequested = $('#recordsToRetrieve').val().trim(); // loads the number-of-records-to-retrieve from html form into a variable
		yearStart = $('#startYear').val().trim(); // loads the ending-year from html form into a variable.
		console.log("Search term is: " + term);
		console.log("retrieve this many: " + quantityRequested);
		console.log("Year start is interger? " + Number.isInteger(parseInt(yearStart)) + "length = " + yearStart.length);
		console.log(yearEnd);

		// we'll always need the apiKey in the url.
		params['api-key'] = apiKey;
		// if the user sets a value for a given parameter, then include that parameter in the url.
		if (term != "") { params['q'] = term; }
		if (yearStart != "") {
			// Make sure the user entered a YEAR correctly, and...
			if ((Number.isInteger(parseInt(yearStart))) && (yearStart.length == 4)) {
			params['begin_date'] = (yearStart + '0101');

			// ... if they didnt --> add a message into the text input field, and AVOID API ERROR.
			} else {
				$('#startYear').attr("placeholder", " Please enter a four digit year").val("").blur();
				return false;
			} // if-else isInteger
		}
		if (yearEnd != "") {
			// Make sure the user entered a YEAR correctly, and...
			if ((Number.isInteger(parseInt(yearEnd))) && (yearEnd.length == 4)) {
			params['end_date'] = (yearEnd + '0101');

			// ... if they didnt --> add a message into the text input field, and AVOID API ERROR.
			} else {
				$('#endYear').attr("placeholder", " Please enter a four digit year").val("").blur();
				return false;
			} // if-else isInteger
		}

		queryApi();
	}); // on click
}); // document.ready