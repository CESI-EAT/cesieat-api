const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
/**
 * Indicates how many rounds should bcrypt use to generate a new salt.
 */
const saltRounds = 12;

/**
 * Returns a promise that hashes a string and resolves with the obtained hash.
 * @param {String} str The string to hash.
 * @returns The hashed string, or an error object if any error occured.
 */
const hashString = async (str) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (saltErr, salt) => {
      if (saltErr) {
        reject(saltErr);
      } else {
        bcrypt.hash(str, salt, (hashErr, hash) => {
          if (hashErr) {
            reject(hashErr);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });

/**
 * Compares a string with a hash to see if they match.
 * @param {String} str The string to compare.
 * @param {String} hash The hash to compare with.
 * @returns A boolean which is true if the string matches the hash, false otherwise. Error object if any error occured.
 */
const compareStringWithHash = async (str, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function createJWT(user) {
  const id = user.id;

  const expiresIn = 60 * 24 * 60 * 60;

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, 'aezfn7324n369bbubi88Blk886', {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

module.exports = {
  hashString,
  compareStringWithHash,
  createJWT,
};
