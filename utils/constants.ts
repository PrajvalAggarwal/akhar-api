const constants :any   ={}

constants.MAXOTP=999999
constants.MINOTP=100000

constants.OTP={
    MAX:999999,
    MIN:100000,
    EXPIRES_IN:5 * 60000// minutes
}
constants.MESSAGE={
    SUCCESS:"Success",
    FAILURE:"Failure",
}

export default constants