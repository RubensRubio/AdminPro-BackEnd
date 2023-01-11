const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {

    try {

        const uid = req.uid;

        const medico = new Medico({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
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

const actualizarMedico = async (req, res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun medico con ese ID'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
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

const eliminarMedico = async (req, res = response) => {
    try {

        const medicoId = req.params.id;

        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun medico con ese ID'
            });
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
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

const getMedicoById = async (req, res) => {

    try {

        const medicoId = req.params.id;

        const medico = await Medico.findById(medicoId)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
    getMedicoById
}