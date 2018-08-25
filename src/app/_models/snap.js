"use strict";
var Snap = (function () {
    // name : string;
    // description : string;
    // path? : string;
    function Snap(name, description, thumbnailPath, originalPath, _id, type, featured, publicSnap, album, unMarkedThumbnailPath) {
        this.name = name;
        this.description = description;
        this.thumbnailPath = thumbnailPath;
        this.originalPath = originalPath;
        this._id = _id;
        this.type = type;
        this.featured = featured;
        this.publicSnap = publicSnap;
        this.album = album;
        this.unMarkedThumbnailPath = unMarkedThumbnailPath;
    }
    return Snap;
}());
exports.Snap = Snap;
//# sourceMappingURL=snap.js.map