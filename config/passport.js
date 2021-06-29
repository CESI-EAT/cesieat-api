const JWTstrategy = require('passport-jwt').Strategy;
const { User } = require('../src/models');

/*const pathToKey = path.join(__dirname, '..', 'id_rsa_pub_pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');*/

const secret = 'aezfn7324n369bbubi88Blk886';

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret,
};

const strategy = new JWTstrategy(options, (payload, done) => {
  User.findOne({ where: { email: payload.sub } })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
