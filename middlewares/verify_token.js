
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json('Invalid token');
            }

            req.user = user;
            console.log(user);
            next();
        });

    } else {
        res.status(401).json("User are not authenticated");
    }
}

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json("You are restricted from performing this operation");
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restricted from performing this operation");
        }
    });
}


module.exports = {
    verifyToken,
    verifyAndAuthorization,
    verifyAdmin
}