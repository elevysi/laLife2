var mongoose = require("mongoose");

var albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : "String",
    address : {name : "String", postcode : "String"},
    featured : "boolean",
    publicAlbum : "boolean",
    featuredImagePath : "String",
    owner : "String",
    created : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Album', albumSchema);