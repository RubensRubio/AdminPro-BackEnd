/*

Ruta :  /api/upload/:tabla/:id

*/

const { Router, application } = require('express');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { uploadDocument, returnImage } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id',
    validarJWT,
    uploadDocument);

router.get('/:tipo/:img',
    returnImage);


module.exports = router;