const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    // const usuarios = await Usuario.find({ nombre: regex });
    // const medicos = await Medico.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
    });
}

const getDocumentsCollection = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let resultados;
    
    switch (tabla) {

        case "medicos":

            resultados = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');

            break;

        case "hospitales":

            resultados = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');


            break;

        case "usuarios":

            resultados = await Usuario.find({ nombre: regex });

            break;

        default:

            return res.status(400).json({
                ok: false,
                msg: 'No existe la tabla'
            });
    }

    res.status(200).json({
        ok: true,
        resultados
    });
}


module.exports = {
    getTodo,
    getDocumentsCollection
} 