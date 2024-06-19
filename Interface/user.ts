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

export interface IUserOTP{
    email:string;
    otp:number;
    expiresIn:Date;
}

export interface IVerfiyOTP{
    email:string;
    otp:number
}