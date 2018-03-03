const express = require('express');
const router = express.Router();
const metadata = require('./metadata.json')

var cheerio = require('cheerio');

var rp = require('request-promise');

router.get('/', function(req,res) {
	res.render('pages/home');
});

router.get('/lookup', lookup);

function lookup(req,res) {
	
	var json;
	//var uri_lookup = 'http://www.phila.gov/revenue/realestatetax/?txtBRTNo=';
	var uri_lookup = 'http://www.phila.gov/revenue/realestatetax/?txtBRTNo=';
	var options = {
			uri: uri_lookup + req.query.brt,
			transform: function (body) {
				return cheerio.load(body);
			}
	};
	
	rp(options)
		.then(($) => {
			//Process the returned html and assign it to json for return to user
			if ($('#' + metadata.customer_table_id).length) {
				json = {
						acc_number: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.account_cell_id).text(),
						owner: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.owner_cell_id).text(),
						address: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.address_cell_id).text(),
				};
				
				var data = [];
				$('#' + metadata.balance_table_id + ' tr').each(function() {
					var row = $(this).find('td').text();
					console.log(row);
				});
				
				//console.log(data);
				//json.push({balances:data});
				
				//console.log($('#' + metadata.balance_table_id + ' tr'));
				
				res.json(json);
			}
			else {
				//If the page contains an error message, i.e. the table containing customer information does not exist, inform the user
				res.status(404).send({status: 404, message:'That BRT does not exist'});
			}
		})
		.catch((err) => {
			//Our page crawl failed
			console.log(err);			
		});
}

module.exports = router;