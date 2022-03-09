const {response} = require('express');
const {Evento} = require('../models/Evento')


const getEvento = async(req, res = response) =>{

    const eventos = await Evento.find().populate('user','name');

    res.status(201).json({
        ok : true,
        eventos
    });
}

const crearEvento = async( req, res = response) => {

    const evento = new Evento( req.body );

    try{

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        
        res.json({
            ok: true,
            evento : eventoGuardado,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg : 'verificar'
        })
    }
}

const actualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);
     

        if(!evento){
            return res.status(404).json({
                ok : false,
                msg : 'Evento no existe por ese Id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok : false,
                msg : 'no tiene privilegio de editar este evento.'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})

        res.json({
            ok: true,
            evento : eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'error'

        })
    }
}

const eliminarEvento = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);
     

        if(!evento){
            return res.status(404).json({
                ok : false,
                msg : 'Evento no existe por ese Id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok : false,
                msg : 'no tiene privilegio de eliminar este evento.'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId, {new: true})

        res.status(201).json({
            ok: 'true',
            evento : eventoEliminado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : 'error'

        })
    }

    
}

// editar nombre del usuario

// editar contraseña para un futuro :3

module.exports = {
    getEvento,
    eliminarEvento,
    actualizarEvento,
    crearEvento,
}