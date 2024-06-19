
import { Request, Response } from "express";
import httpStatus from 'http-status';
import { ILoginUser, IUser } from "../Interface/user";




//TOOD: coorect the login controller request body from IUser to ILoginUser
const loginUser = async (req: Request, res: Response) => {
    const user = req.body as ILoginUser;
    // const result = await login(user);
    res.status(httpStatus.OK);
    // res.send({message:"Sucess",data:result});
}


export  {
    loginUser
}