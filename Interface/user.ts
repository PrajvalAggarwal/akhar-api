export interface IUser {
    email : string;
    password : string;
    name : string;
    pic :string;
    socialId:string;
    socialType:string;
    dob:Date;

}

export interface ILoginUser {
    email : string;
}
