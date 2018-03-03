$(function () {
    $('#retrieve').bind('click', function() {
    	try {
    		$('.indeterminate').show();
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
		
		var data = { brt: brt };
		
		$.getJSON("/lookup", data,				
				function(response) {
					$('#outputDiv').fadeOut('fast', function() {
						
					$('#outputDiv').html(
						'<div class="row">' + 
							'<table class="striped">' + 
							'<thead><tr>' + '<th>Account Number</th>' + '<th>Owner</th>' + '<th>Address</th>' + '</tr></thead>' +
							'<tbody><tr>' +
							'<td>' + response.acc_number + '</td>' + 
							'<td>' + response.owner + '</td>' + 
							'<td>' + response.address + '</td>' +
							'</tr></tbody>' +
							'</table>' + '</br>' +
							'<table class="striped responsive-table" style="margin-top:10px;">' + 
							'<thead><tr><th colspan="9">Real Estate Tax Balance Information</th></tr>' +
							'<tr>' + '<th>Year</th>' + '<th>Principal</th>' + '<th>Interest</th>' + '<th>Penalty</th>' +
							'<th>Other</th>' + '<th>Total</th>' + '<th>Lien#</th>' + '<th>City Solicitor</th>' + '<th>Status</th>' + '</tr></thead>' +
							
							'</table>' +
						'</div>'); 
					$('#outputDiv').fadeIn('fast');
					$('.indeterminate').hide();
					});
		    }).fail(function(err) {
		    	$('#outputDiv').fadeOut('fast', function() {
	    		$('#outputDiv').html(
					'<div class="row">' + 
						'<div class="col s8"><h6>That BRT number does not exist, please confirm that the number is correct.</h6></div>' +
					'</div>'); 
				$('#outputDiv').fadeIn('fast');
				$('.indeterminate').hide();
				});
		    	//This will also throw a error 404 taht jQuery will print to the console.
		    });
	}
	// Log any errors to the console
	catch (err) {
		console.log(err);
	}
}