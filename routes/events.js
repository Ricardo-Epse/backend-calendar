// obtener eventos
const { Router } = require("express");
const { getEvento, actualizarEvento, eliminarEvento, crearEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate }  = require("../helpers/isDate");

const router = Router();

//router.use(validarJWT); // PODRÍA USARSE EN LUGAR DE VALIDAR CADA UNO
router.get('/',validarJWT, getEvento);

router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatorio').custom(isDate),
    check('end','Fecha de fin es obligatoria').custom(isDate),
    validarCampos
],validarJWT,crearEvento);

router.put('/:id',validarJWT,actualizarEvento);

router.delete('/:id',validarJWT,eliminarEvento);

module.exports = router;