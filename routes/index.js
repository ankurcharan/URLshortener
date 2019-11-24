const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');

const app = express.Router();
const urlSchema = require('../models/urlShorten').urlSchema;


// Redirect Shortened URL
app.get('/:code', async (req, res) => {

	const urlCode = req.params.code;

	console.log(urlCode);

	const item = await urlSchema.findOne({ urlCode: urlCode });

	if(item) {
		return res.redirect(item.originalUrl);
	} else {
		return res.redirect('/404NotFound.html');
	}
});


// Add Shorten URL
app.post('/url/add', async (req, res) => {

	const originalUrl = req.body.originalUrl;

	if(!validUrl.isUri(originalUrl)) {

		return res.status(401).json({
			success: false,
			message: 'Invalid Original URL.'
		});
	}

	let urlCode = shortid.generate();
	while (true) {

		const urlCodeExists = await urlSchema.findOne({
			urlCode
		});

		if(urlCodeExists) {
			urlCode = shortid.generate();
		} else {
			break;
		}
	}

	const item = await urlSchema.findOne({
		originalUrl
	});

	if(item) {

		return res.status(200).json({
			success: true,
			message: 'Short URL Added',
			data: {
				urlCode: item.urlCode,
				originalUrl: item.originalUrl
			}
		});

	} 
	
	const newItem = new urlSchema({
		originalUrl,
		urlCode,
	});

	await newItem.save();

	res.status(200).json({
		success: true,
		message: 'Short URL Added',
		data: {
			urlCode: newItem.urlCode,
			originalUrl: newItem.originalUrl
		}
	});
	
});

// For all other routes
app.use((req, res) => {

	res.redirect('/404NotFound.html');
	
})

module.exports = app;