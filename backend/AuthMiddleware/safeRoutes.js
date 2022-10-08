const ActiveSession = require('./activeSessionSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const reqAuth = (req, res, next) => {

    let token = String(req.headers.authorization);
    
    // Activesession check find function for the token
    ActiveSession.findOne({token: token}, (err, doc) => {

        if (err) {
            res.status(500).json({error: err});
        } else if (doc) {
            
            // Remove the first 4 letters from the token to get the actual token
            token = String(req.headers.authorization).slice(4);
            
            // Obtain the expiry date of the token from the token

            try {
                const expiryDate = jwt.decode(token).exp;
    
                const decode = jwt.verify(token, process.env.SECRET_KEY);
    
                console.log(decode);
    
                // Check if the token has expired
                if (expiryDate < Date.now() / 1000) {
                    res.status(401).json({error: 'Token expired'});
                }
                else {
                    next();
                }
            }
            catch (err) {
                res.status(401).json({error: err});
            }
        } else {
            res.status(401).json({error: "Unauthorized"});
        }
    });
}

module.exports = reqAuth;