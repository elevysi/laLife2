import { Album } from "../_models/album";

export class Snap{
    // name : string;
    // description : string;
    // path? : string;

     constructor(
        public name : string,
        public description : string,
        public thumbnailPath? : string,
        public originalPath? : string,
        public _id?: string,
        public type?: string,
        public featured? : boolean,
        public publicSnap? : boolean,
        public album? : Album,
        public unMarkedThumbnailPath? : string
       
  ) {  }
}
