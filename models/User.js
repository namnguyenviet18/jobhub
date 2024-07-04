const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: true },
    isAgent: { type: Boolean, default: false },
    skills: { type: Array, default: false },
    profile: {
        type: String,
        required: true,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);