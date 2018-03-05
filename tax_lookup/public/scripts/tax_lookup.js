$(function () {
    $('#retrieve').bind('click', function() {
    	try {
    		$('.preloader-wrapper').addClass('active');
    		getOutput();
    	} 
    	catch (err) {
    		console.log(err);
    	}
    });
});

function getOutput() {
	// Get response and add it to our outputDiv
	try {
		var brt  = $('#txtBRT').val().replace(/\D/g,'');
		
		var data = { txtBRTNo: brt };
		
		$.getJSON("/lookup", data,				
				function(response) {
					$('#outputDiv').fadeOut('slow', function() {
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
						
						$('#outputDiv').html( output + '</tbody></table>' +'</div>'); 
					$('#outputDiv').fadeIn('fast');
					$('.preloader-wrapper').removeClass('active');
				});
		    }).fail(function(err) {
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
		    	//This will also throw a error 404 taht jQuery will print to the console.
		    });
	}
	// Log any errors to the console
	catch (err) {
		console.log(err);
	}
}