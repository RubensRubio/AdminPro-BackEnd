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

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun hospital con ese ID'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital : hospitalActualizado
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const eliminarHospital = async (req, res = response) => {

    try {

         const hospitalId = req.params.id;

        const hospitalDB = await Hospital.findById(hospitalId);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun hospital con ese ID'
            });
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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