const ActiveSession = require('./activeSessionSchema');

const reqAuth = (req, res, next) => {
    const token = String(req.headers.authorization);
    ActiveSession.find({token: token}, function(err, session) {
        if(session.length > 0) {
            next();
        } else
            res.json({succes: false, message: "Not logged in"});
    });
}

module.exports = reqAuth;