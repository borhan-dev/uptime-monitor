const crypto=require("crypto")
const utils = {}

const SECRET_KEY="AHIAUIBIKABJKFJKUAFAF"

utils.isJson = (str) => {
    try { 
        JSON.parse(str)
    } catch {
       return false
    }

    return true
}

utils.parseJSON = (str) => {
    return JSON.parse(str)
}

utils.hash = (password) => {
    return crypto.createHmac("sha256",SECRET_KEY).update(password).digest("hex")
}

module.exports=utils