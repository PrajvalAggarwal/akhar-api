const constants: any = {}

constants.MAXOTP = 999999
constants.MINOTP = 100000

constants.OTP = {
    MAX: 999999,
    MIN: 100000,
    EXPIRES_IN: 5 * 60000, //5 minutes
    INVALID_OTP: "Invalid OTP",
    EXPIRED_OTP: "OTP Expired",
    OTP_SENT: "OTP Sent Successfully"
}

constants.USER = {
    USER_NOT_FOUND: "User Not Found",
}
constants.MESSAGE = {
    SUCCESS: "Success",
    FAILURE: "Failure",
    INTERNAL_SERVER_ERROR: "Internal Server Error"
}

constants.AUTHORISATION = "authorisation"


constants.JWT = {
    EXPIRES_IN: 5 * 60000 // 5 minutes 
}

export default constants