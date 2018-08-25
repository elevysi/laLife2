var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require("util");

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){ 
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "success" : true
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

exports.delete = (req, res, err) => {
    var id = req.params.id;
    User.remove({_id : id}, (err, resource) => {
        if(err) res.send(err).status(501);
        else res.send(resource).status(200);
    });
  
};

module.exports.register = function(req, res) {
  var user = new User(req.body.user);
  user.setPassword(req.body.user.password);

  user.save((err, resource) => {
        if(err) res.send(err).status(501);
        else{
          var token;
          token = user.generateJwt();
          res.status(201); //201 HTML code for created
          res.json({
            "token" : token,
            "success" : true
          });
        } 
    });
};

module.exports.list = function(req, res) {
  User.find({}, (err, resources) => {
        if(err) res.send(err).status(404);
        else {
            // console.log(resources);
            res.send(resources).status(200);
        }
    });
};

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

exports.getUser = (req, res, err) => {
    var username = req.params.username;
    User.findOne({username : username})
    .exec(function(err, user) {
        if(err) res.send(err).status(501);
        else{            
            res.status(200).json(user);
        }
    });
    
};


exports.edit = (req, res, err) => {
    
    User.findById(req.body.user._id, (err, foundUser) => {
        if(err) res.send(err).status(501);
        else{

            //https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
            
            var query = {'username':req.body.user.username};
            User.findOneAndUpdate(query, req.body.user, {upsert:true}, function(err, resource){
                if (err) return res.send(500, { error: err });
                return res.json(resource).status(201); //201 HTML code for created
            });

            
        }
    });
};

module.exports.updatePass = function(req, res) {
  
  var username = req.body.user.username;


  User.findOne({ username: username }, function (err, dbUser) {
      if (err) { res.send(err).status(501); }
      // Return if user not found in database
      if (!dbUser) {
        
        return res.status(500).send({ error: "Could not find the logged in user."});
      }
      // Return if password is wrong
      if (!dbUser.validPassword(req.body.user.currentPassword)) {
        return res.status(500).send({ error: "The provided password is not correct."});
      }else{

        dbUser.setPassword(req.body.user.newPassword);
        User.update({_id: dbUser._id}, {
                  hash: dbUser.hash,
                  salt: dbUser.salt,
              }, function(err, resp) {
                  if (err) return res.status(500).send({ error: err });
                  return res.status(200).send(resp);
        });

      }
    });
  
 
};