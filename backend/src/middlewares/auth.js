const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        return res.status(401).json({message: 'Not authorized access to this route'});
    }
}

module.exports = authMiddleWare