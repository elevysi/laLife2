"use strict";
var Album = (function () {
    function Album(name, description, address, featured, publicAlbum, _id, featuredImagePath, owner) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.featured = featured;
        this.publicAlbum = publicAlbum;
        this._id = _id;
        this.featuredImagePath = featuredImagePath;
        this.owner = owner;
    }
    return Album;
}());
exports.Album = Album;
//# sourceMappingURL=album.js.map