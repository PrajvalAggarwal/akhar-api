
import nodemailer from "nodemailer";
import config from "../config/config";
import constants from "./constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../Interface/user";
import { User, UserOtp } from "../models/user";

const transporter = nodemailer.createTransport({
  host: config.EMAIL.smtp.host,
  port: config.EMAIL.smtp.port,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.EMAIL.smtp.auth.user,
    pass: config.EMAIL.smtp.auth.pass,
  },
});

//Seding mail
const sendMail = async (email: string, otp: string, name: string) => {
  const info = await transporter.sendMail({
    from: '<contact@llamanodes.net>', // sender address
    to: `${email}`, // list of receivers
    subject: `Verification mail`, // Subject line
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for choosing Archisketch Company. Use the following OTP
              to complete the procedure to change your email address. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
              Do not share this code with others, including Archisketch
              employees.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:archisketch@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >archisketch@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Archisketch Company
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Address 540, City, State.
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
          /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2022 Company. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
`, // html body
  });

}

//Generating OTP based on digits
function generateOTP(): number {
  const min = constants.OTP.MIN;
  const max = constants.OTP.MAX;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Generating jwt token
function generateToken(id: any): string {
  const token = jwt.sign({ id }, config.JWT.Secret, {
    expiresIn: constants.JWT.EXPIRES_IN,
  });
  return token;
}

//Decoding jwt token
function decodeToken(token: any): string | JwtPayload {
  const decoded = jwt.verify(token, config.JWT.Secret);
  return decoded;
}


//send the otp 
const sendOTP = async (user: IUser) => {
  // console.log(user)

  console.log()
  const oldOTP = await UserOtp.findOne({ userId: user._id });
  // console.log(oldOTP)
  const otp = generateOTP();
  if (oldOTP) {
    const expiresIn = new Date(Date.now() + constants.OTP.EXPIRES_IN);
    // const filter = { userId: user._id }
    // const update = { otp: otp, expiresIn: expiresIn }
    oldOTP.otp = otp;
    oldOTP.expiresIn = expiresIn
    await oldOTP.save()
  } else {

    const userOTP = new UserOtp({
      userId: user._id,
      otp: otp,
    });
    await userOTP.save();
  }
  await sendMail(user?.email, String(otp), user?.name);


}


export { sendMail, generateOTP, generateToken, decodeToken, sendOTP }