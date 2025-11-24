import { Request, Response } from "express";
import { Patients } from "../models/patients";



export const createPatient = async (req: Request, res: Response) => {

    const data = req.body;

    try {

        const patient = await Patients.create(data)

        res.status(201).json({
            patient
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getPatients = async (req: Request, res: Response) => {

    try {
        
        const patients = await Patients.findAll()

        if (!patients) {
            res.status(404).json({
                msg: "No hay pacientes cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            patients
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const updatePatient = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id;

    try {

        const patient = await Patients.findByPk(id)

        if (!patient) {
            res.status(404).json({
                msg: "El paciente no esta cargado en el sistema"
            })
            return
        }

        await patient.update(data)

        res.status(200).json({
            patient
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}