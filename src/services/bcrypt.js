/**
 * The js version of the original bcrypt library. Allows the use of bcrypt without installing python.
 */
const bcrypt = require('bcryptjs')

/**
 * Indicates how many rounds should bcrypt use to generate a new salt.
 */
const saltRounds = 12

/**
 * Returns a promise that hashes a string and resolves with the obtained hash.
 * @param {String} str The string to hash.
 * @returns The hashed string, or an error object if any error occured.
 */
const hashString = async (str) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (saltErr, salt) => {
      if (saltErr) {
        reject(saltErr)
      } else {
        bcrypt.hash(str, salt, (hashErr, hash) => {
          if (hashErr) {
            reject(hashErr)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })

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
        reject(err)
      } else {
        resolve(res)
      }
    })
  })

module.exports = {
  hashString,
  compareStringWithHash,
}
