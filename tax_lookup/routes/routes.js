const express = require('express');
const router = express.Router();
const metadata = require('./metadata.json')

var cheerio = require('cheerio');

var rp = require('request-promise');

router.get('/', function(req,res) {
	res.render('pages/home');
});

router.get('/about', function(req,res) {
	res.render('pages/about');
});

router.get('/lookup', lookup);

function lookup(req,res) {
	
	var json;
	var options = {
			uri: metadata.uri + req.query.txtBRTNo,
			transform: function (body) {
				return cheerio.load(body);
			}
	};
	
	rp(options)
		.then(($) => {
			//Process the returned html and assign it to json for return to user
			if ($('#' + metadata.customer_table_id).length) {
				
				var data = [];
				$('#' + metadata.balance_table_id + ' tr:not(tr.grdHeader)').each(function() {
					var row = [];
					$(this).children().each(function() {
						row.push($(this).text());
					});
					data.push(row);
				});
				
				json = {
						acc_number: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.account_cell_id).text(),
						owner: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.owner_cell_id).text(),
						address: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.address_cell_id).text(),
						balances: data
				};

				res.json(json);
			}
			else {
				//If the page contains an error message, i.e. the table containing customer information does not exist, inform the user
				res.status(500).send({status: 500, message:'That BRT does not exist'});
			}
		})
		.catch((err) => {
			//Our page crawl failed
			console.log(err);
			res.status(500).send();
		});
}

module.exports = router;