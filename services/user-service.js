const userModel = require('../models/user-model')

const createUser = async ({
    username, email, password, phone
}) => { 
    if (!email || !password || !username || !phone) {
        throw new Error('All feilds are required')
    }

    const user = await userModel.create({
        username,
        email,
        password,
        phone
    })

    return user;
}

module.exports = { createUser }
