// const JWT = require("jsonwebtoken");

// const userAuth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//          next("Auth Failed");
//     }

//     const token = authHeader.split(" ")[1];
//     try {
//         const payload = JWT.verify(token, process.env.SECRET_KEY);
//         req.user = { userId: payload.userId };
//         next();
//     } catch (error) {
//         next("Auth Failed");
//     }
// };

// module.exports = userAuth;
const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(new Error("Authentication Failed: Invalid Token"));
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = JWT.verify(token, process.env.SECRET_KEY);
        console.log("Received token:", token);
        req.body.user = { userId: payload.userId };
        next();
    } catch (error) {
        return next("Auth Failed");
    }
};

module.exports = userAuth;