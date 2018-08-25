export class Album{
   


    constructor(
        public name : string,
        public description : string,
        public address : string,
        public featured : boolean,
        public publicAlbum : boolean,
        public _id?: string,
        public featuredImagePath? : string,
        public owner? : string
       
  ) {  }

}