const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        console.log(process.env.authSecret);
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if(token) {
            let decodeData = jwt.verify(token, process.env.authSecret);
            console.log("USER ID", decodeData?.id);
            req.userId = decodeData?.id;
        }
        next();
    } catch(error) {
        console.log(error);
    }
}

module.exports = { auth };