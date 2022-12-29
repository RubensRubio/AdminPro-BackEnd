const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {


    try {

        const uid = req.uid;

        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }

}

const actualizarHospital = async (req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto

    // const uid = req.params.id;

    try {

        // const usuarioDB = await Usuario.findById(uid);

        // if (!usuarioDB) {
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe ningun usuario con ese ID'
        //     });
        // }

        // //Actualizar usuario
        // const { password, google, email, ...campos } = req.body;

        // if (usuarioDB.email !== email) {

        //     const existeEmail = await Usuario.findOne({ email });

        //     if (existeEmail) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con ese email'
        //         });

        //     }

        // }
        // campos.email = email;
        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            // usuarioActualizado
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}

const eliminarHospital = async (req, res = response) => {
    try {

        // const uid = req.params.id;

        // const usuarioDB = await Usuario.findById(uid);

        // if (!usuarioDB) {
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe ningun usuario con ese ID'
        //     });
        // }

        // await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital

}