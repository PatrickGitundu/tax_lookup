/*
 * Bind a click function to our submit button.
 * We could alternatively create a form that would use the enter button to submit our account number. 
 * We would then substitute this function with an on_submit function.
 */
$(function () {
    $('#retrieve').bind('click', function() {
    	try {
    		// Initialize our loading graphic to indicate to the user that the API is retrieving data.
    		$('.preloader-wrapper').addClass('active');
    		// Call our function to call the API and process the returned json into our tables
    		getOutput();
    	} 
    	catch (err) {
    		console.log(err);
    	}
    });
});

/*
 * A function to call our API and parse the returned JSON into tables.
 * If the call did not return any result, inform the user that the call failed.
 */
function getOutput() {
	// Get response and add it to our outputDiv
	try {
		// Retrieve our account number from the input text box and remove all non-digits from the string using a regular expression.
		var brt  = $('#txtBRT').val().replace(/\D/g,'');
		// Assign our number only string to a JSON for our AJAX call
		var data = { txtBRTNo: brt };
		// Use JQuery's built-in getJSON function to call our API
		$.getJSON("/lookup", data,				
				function(response) {
					// A bit of styling to make transitions between account searches a little prettier.
					$('#outputDiv').fadeOut('slow', function() {
						// Create our tables from the returned JSON.
						var output = '<div class="row">' + 
						'<div class="row"><div class="col s12"><h6>Account Information</h6></div></div>' +
						'<table class="striped">' + 
						'<thead><tr>' + '<th>Account Number</th>' + '<th>Owner</th>' + '<th>Address</th>' + '</tr></thead>' +
						'<tbody><tr>' +
						'<td>' + response.acc_number + '</td>' + 
						'<td>' + response.owner + '</td>' + 
						'<td>' + response.address + '</td>' +
						'</tr></tbody>' +
						'</table>' + '</br>' +
						'<div class="row"><div class="col s12"><h6>Real Estate Tax Balance Information</h6></div></div>' +
						'<table class="striped responsive-table" style="margin-top:10px;">' + 
						'<thead><tr>' + '<th>Year</th>' + '<th>Principal</th>' + '<th>Interest</th>' + '<th>Penalty</th>' +
						'<th>Other</th>' + '<th>Total</th>' + '<th>Lien#</th>' + '<th>City Solicitor</th>' + '<th>Status</th>' + '</tr></thead><tbody>';
						
						var bal_length  = response.balances.length;
						for (var i=0; i < bal_length ; i++) {
							output += '<tr>';
							for (var j=0; j < 9; j++) {
								output += '<td>';
								output += response.balances[i][j];
								output += '</td>';
							}
							output += '</tr>';
						}					
						// Replace the inner HTML of our outputDiv with our tables.
						$('#outputDiv').html( output + '</tbody></table>' +'</div>'); 
					$('#outputDiv').fadeIn('fast');
					// Remove our loadiug graphic once the parsing is done.
					$('.preloader-wrapper').removeClass('active');
				});
		    }).fail(function(err) {
		    	// If our scrape attempt did not succeed, inform the user so they may try again. 
		    	$('#outputDiv').fadeOut('slow', function() {
	    		$('#outputDiv').html(
					'<div class="row">' + 
						'<div class="col s8">' +
							'<h5>Oops! It seems an error has occured.</h5>' +
							'<p>This could be due to the following reasons:</p>' + 
							'<ol>' + 
							'<li>That BRT number does not exist (was not found), please confirm that you have entered number correctly. <strong>OR</strong></li>' + 
							'<li>The tax lookup application failed to respond.</li>' +
							'</ol>' +
							'<h6>Please try again.</h6>' +
							'</div>' +
					'</div>'); 
				$('#outputDiv').fadeIn('fast');
				$('.preloader-wrapper').removeClass('active');
				});
		    	//This will also throw a error 404 that jQuery will print to the console.
		    });
	}
	// Log any errors related to our getJSON call to the console
	catch (err) {
		console.log(err);
	}
}