const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //Eliminar imagen actual
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async (tipo, id, fileName) => {

    let pathActual;

    switch (tipo) {

        case "medicos":

            const medico = await Medico.findById(id);

            if (!medico) {
                console.log('No se encontro ningun medico');
                return false;
            }

            pathActual = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathActual);

            medico.img = fileName;
            await medico.save();

            return true;

            break;

        case "hospitales":

            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('No se encontro ningun hospital');
                return false;
            }

            pathActual = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathActual);

            hospital.img = fileName;
            await hospital.save();

            return true;

            break;

        case "usuarios":

            const usuario = await Usuario.findById(id);

            if (!usuario) {
                console.log('No se encontro ningun usuario');
                return false;
            }

            pathActual = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathActual);

            usuario.img = fileName;
            await usuario.save();

            return true;

            break;

        default:

            break;

    }

}

module.exports = {
    actualizarImagen
}