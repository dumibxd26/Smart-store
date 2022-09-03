const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// module.exports = function(passport) {
//     let opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = 'secretkey';
//     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//         console.log(jwt_payload);
//         done(null, jwt_payload);
//     }));
// }