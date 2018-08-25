const util = require('util');
var Album = require("../models/album");


module.exports.add = function(req, res) {

  var album = new Album(req.body.album);
  // console.log(util.inspect(req.body, {showHidden: false, depth: null}));
            
            album.save((err, resource) => {
                if(err) res.send(err).status(501);
                else{
                    
                    res.json(resource).status(201); //201 HTML code for created
                } 
            });
};

module.exports.view = function(req, res) {

   Snap
      .findById(req.params.id)
      // .findOne({name : req.params.id})
      .exec(function(err, snap) {
        res.render('snap', {snap: snap, moment: moment});
      });

};


module.exports.edit = function(req, res) {
  var album = new Album();


};

module.exports.delete = function(req, res) {
  var album = new Album();


};

module.exports.list = function(req, res) {
  Album.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            res.send(resources).status(200);
        }
    });
};

module.exports.listFeatured = function(req, res) {
  Album.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};