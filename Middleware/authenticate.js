const JWT = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Unauthorized - No Token" });
        }

        const token = authHeader.split(" ")[1];

<<<<<<< HEAD
        const decoded = JWT.verify(token,process.env.JWT_SECRET, {algorithms:"HS256"});
=======
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
>>>>>>> e1feb8a550e99c562ec7cacb8457a28f79216e7a

        req.user = decoded;
        
        next();

    } catch (error) {
        return res.status(401).json({ msg: "Invalid or Expired Token" });
    }
};

module.exports = authenticate;