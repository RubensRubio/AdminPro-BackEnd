const { response } = require('express');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path')
const fs = require('fs')



const uploadDocument = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es hospital, medico o usuario'
        });
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se cargo ningun archivo.'
        });
    }

    //Procesar imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extesión permitida'
        });
    }

    //Generar el nombre del archivo
    const fileName = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${fileName}`;

    // Mover la imagen
    file.mv(path, (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar el archivo'
            });
        }

        //Actualizar BD
        actualizarImagen(tipo, id, fileName);

        res.status(200).json({
            ok: true,
            msg: 'Archivo cargado con exito',
            fileName
        });
    });

}


const returnImage = (req, res = response) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);

    //imagen por defecto
    if(!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }

    res.sendFile(pathImg);

}

module.exports = {
    uploadDocument,
    returnImage
} 