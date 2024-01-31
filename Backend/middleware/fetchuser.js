const jwt = require('jsonwebtoken');
require("dotenv").config({ path: './config.env' });

const fetchuser = (req, res, next) => {
    // Fetch user data and add user id to the req object
    const Token = req.header('auth-token');

    if (!Token) {
        res.status(401).send({ error: 'Please authenticate using a valid auth-token' });
    }

    try {
        const data = jwt.verify(Token, process.env.JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Some error occured' });
    }
}

module.exports = fetchuser;