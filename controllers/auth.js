const {response} = require('express');
const bcrypt = require('bcryptjs');
const {Usuario} = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        let newUsuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUsuario.password = bcrypt.hashSync( password, salt );


        await newUsuario.save();

        // Generar JWT
        const token = await generarJWT( newUsuario.id, newUsuario.name );
    
        res.status(201).json({
            ok: true,
            uid: newUsuario.id,
            name: newUsuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req,res = response) => {

    const {email,password} = req.body;

   try {

    const usuario = await Usuario.findOne({email});
    
    if(!usuario){
        return res.status(400).json({
            ok: false,
            msg : 'El usuario no existe'
        });
    }

    //confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'la contraseña no coincide'
        })
    }

    const token = await generarJWT(usuario.id , usuario.name)

       res.json({
           ok : true,
           uid: usuario.id,
           name: usuario.name,
           token
       })
       
   } catch (error) {
       console.log(error)
       res.status(500).json({
           ok : false,
           msg : "Por favor hable con el administrador",
       })
   } 

} 

const revalidarToken = async(req,res = response) => {

    // const uid = req.uid;
    // const name = req.name;

    const {uid , name} = req

    const token = await generarJWT( uid , name )


    res.json({
        ok : true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}


// const crearUsuario = async(req,res = response) => {

//    const { email, password } = req.body;

//    try {
   
//     let usuario = await Usuario.findOne({email});
    
//     if(usuario){
//         return res.status(400).json({
//             ok: false,
//             msg : 'Un usuario existe con ese correo'
//         });
//     }
    
//     usuario = new Usuario( req.body )

//     const salt = bcrypt.genSaltSync();
//     usuario.password = bcrypt.hashSync(password,salt);

//     await usuario.save();

//     const token = await generarJWT(usuario.id , usuario.name)

//     res.json({
//         ok : true,
//         uid : usuario.id,
//         name: usuario.name,
//         token
//     });
     
//    } catch (error) {
//        console.log(error)
//        res.status(500).json({
//            ok : false,
//            msg : "Por favor hable con el administrador",
//        })
//    }
// }