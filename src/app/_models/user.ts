export class User{
    // email : string;
    // firstName : string;
    // lastName : string;
    // password? : string;
    // _id? : string;
    // username? : string;
    // bio? : string;
    // avatarPath? : string;
    // avatarPathThumbnail? : string;

    constructor(
        public email : string,
        public firstName : string,
        public lastName : string,
        public password? : string,
        public username? : string,
        public _id?: string,
        public bio? : string,
        public avatarPath? : string,
        public avatarPathThumbnail? : string
       
  ) {  }

}
