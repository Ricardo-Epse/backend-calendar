const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req,res,next) =>{

    const token = req.header('x-token'); //x-token se leerá - se recibe

    if(!token){
        return res.status(401).json({
            ok: false,
            msg : 'No existe el token'
        })
    }

    try {
        
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'token no valido'
        })
    }

    next()

}

module.exports = {
    validarJWT
}