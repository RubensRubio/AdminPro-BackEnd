/*

Ruta :  /api/todo/:busqueda

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getTodo,getDocumentsCollection} = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda',
    validarJWT,
    getTodo);

router.get('/collection/:tabla/:busqueda',
    validarJWT,
    getDocumentsCollection);


module.exports = router;