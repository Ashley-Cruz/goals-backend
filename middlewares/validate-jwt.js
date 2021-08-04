const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    //x-token headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        //This is the payload
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY   
        );

        console.log(jwt.verify);
        
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}