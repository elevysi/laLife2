var mongoose = require('mongoose');
var Snap = mongoose.model('Snap');
var path = require('path');
var moment = require('moment');
var fs = require('fs');

var configs = require("../configs/secret");

module.exports.snap = function(req, res, next) {
    Snap
      .findById(req.params.id)
      // .findOne({name : req.params.id})
      .exec(function(err, snap) {

        if(typeof snap.type !== 'undefined'){
            if(snap.type == "image"){
              res.render('snap', {snap: snap, moment: moment});
            }else{
              res.render('video', {snap: snap, moment: moment});
            }
        }else{
          res.render('snap', {snap: snap, moment: moment});
        }
        
      });
//   }
};


module.exports.video = function(req, res, next) {
    Snap
      .findById(req.params.id)
      // .findOne({name : req.params.id})
      .exec(function(err, video) {
        res.render('video', {video: video, moment: moment});
      });
//   }
};

