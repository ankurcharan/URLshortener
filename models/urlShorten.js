const mongoose = require('mongoose');

const { Schema } = mongoose;

const UrlSchema = new Schema({
	originalUrl: String,
	urlCode: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
})


let urlSchema = mongoose.model('UrlSchema', UrlSchema);

module.exports = {
	urlSchema
}