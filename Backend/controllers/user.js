const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretkey = process.env.SECRET;

const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const oldUser = await User.findOne({email});

        if(oldUser) {
            return res.status(400).json({
                message: 'User already existed'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newuser = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        })

        console.log(secretkey);
        const token = jwt.sign({email: newuser.email, id: newuser._id}, secretkey, {expiresIn: "30d"});
        res.status(201).json({ newuser, token });
    } catch(error) {
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log("Error", error);
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if(!isPassword) {
            return res.status(400).json({
                message: "Invalid password, Please enter the correct password"
            });
        }

        const token = jwt.sign({email: user.email, id: user._id}, secretkey, {expiresIn: "30d"});
        await res.status(200).json({user, token});
    } catch(error) {
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log("Error", error);
    }
}

module.exports = { signup, signin };