/*
 * Load our library dependencies
 */
const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const rp = require('request-promise');

// Load some pre-defined models such as table and cell IDs
const metadata = require('./metadata.json')

router.get('/', function(req,res) {
	res.render('pages/home');
});

router.get('/about', function(req,res) {
	res.render('pages/about');
});

/*
 * Call our API
 */
router.get('/lookup', lookup);

function lookup(req,res) {
	// Retrieve the account number and append it to our URI for scraping
	let json;
	let options = {
			uri: metadata.uri + req.query.txtBRTNo,
			transform: function (body) {
				// Load and return our target page's HTML
				return cheerio.load(body);
			}
	};
	
	rp(options)
		.then(($) => {
			// Scrape through the returned HTML and parse it to our JSON payload for return to user
			if ($('#' + metadata.customer_table_id).length) {
				// If the user account's information table exists, then the tax lookup application loaded successfully and we can proceed
				let data = [];
				$('#' + metadata.balance_table_id + ' tr:not(tr.grdHeader)').each(function() {
					let row = [];
					// Retrieve the cells from each row and add them to our row array
					$(this).children().each(function() {
						row.push($(this).text());
					});
					// Add the row array to our data array.
					data.push(row);
				});
				
				// Create our JSON payload
				json = {
						acc_number: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.account_cell_id).text(),
						owner: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.owner_cell_id).text(),
						address: $('#' + metadata.customer_table_id + ' ' + '#' + metadata.address_cell_id).text(),
						balances: data
				};
				// Respond with our payload
				res.json(json);
			}
			else {
				//If the page contains an error message, i.e. the table containing customer information does not exist, inform the user
				res.status(500).send({status: 500, message:'That BRT does not exist'});
			}
		})
		.catch((err) => {
			//Our page crawl failed for some reason e.g. the tax lookup application is down. 
			console.log(err);
			res.status(500).send({status: 500, message:'The html page did not render and so could not be scraped.'});
		});
}

module.exports = router;