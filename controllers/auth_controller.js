const User = require('../models/User.js');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
module.exports = {
    createUser: async (req, res) => {
        console.log("vao day");
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        });

        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    loginUser: async (req, res) => {

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json("Wrong login details");
            }

            const decryptPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY).toString();

            if (!decryptPassword === req.body.password) {
                return res.status(401).json("Wrong password");
            }

            const { password, __v, createdAt, ...others } = user._doc;

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent
            }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

            res.status(200).json({ ...others, token });

        } catch (err) {
            res.status(500);
        }
    }
}