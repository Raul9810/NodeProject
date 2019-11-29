const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        console.log("Holi 1 ",req.body.headers.Authorization)
        const token = req.headers.authorization.replace('bearer ', '')
        console.log("Holi 2",token)
        const decoded = jwt.verify(token, "debugkey");
        console.log("Holi 3",decoded)
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401);
        res.json({code: 4, message:"No tienes permiso :("});
    }
}

module.exports = auth