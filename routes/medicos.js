/*

Ruta :  /api/medicos

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    // validarJWT, 
    getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
    [
        // validarJWT,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // check('email', 'El email es obligatorio').isEmail(),
        // check('password', 'El rol es obligatorio').not().isEmpty(),
        // validarCampos
    ],
    actualizarMedico);

router.delete('/:id',
    // validarJWT,
    eliminarMedico);



module.exports = router;