const User = require('../models/User');
const CryptoJS = require('crypto-js');
module.exports = {
    updateUser: async (req, res) => {

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY);
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id, { $set: req.body }, { new: true }
            );

            const { password, __v, createAt, ...others } = updateUser._doc;

            res.status(200).json({ ...others });

        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account successfully seleted");

        } catch (err) {
            res.status(500).json(err.message);

        }
    },

    getUser: async (req, res) => {
        try {

            const user = await User.findById(req.params.id);
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
            res.status(200).json({ userData });

        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const allUser = await User.find();
            res.status(200).json(allUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}