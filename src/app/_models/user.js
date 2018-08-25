"use strict";
var User = (function () {
    // email : string;
    // firstName : string;
    // lastName : string;
    // password? : string;
    // _id? : string;
    // username? : string;
    // bio? : string;
    // avatarPath? : string;
    // avatarPathThumbnail? : string;
    function User(email, firstName, lastName, password, username, _id, bio, avatarPath, avatarPathThumbnail) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this._id = _id;
        this.bio = bio;
        this.avatarPath = avatarPath;
        this.avatarPathThumbnail = avatarPathThumbnail;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map