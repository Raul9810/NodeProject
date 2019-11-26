const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401);
        res.json({code: 4, message:"No tienes permiso :("});
    }
}

module.exports = auth