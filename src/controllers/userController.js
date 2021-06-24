const User = require('../models/User')
const userController = {}

userController.getAll = async (req,res)=> {
    try {
        const users = await User.list()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = userController