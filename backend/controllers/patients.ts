import { Request, Response } from "express";
import { Patients } from "../models/patients";
import { Op } from "sequelize";
import { SocialsWorks } from "../models/socialsWorks";



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
        
        const {search, gender, state, socialWorkId} = req.query

        const filter: any = {}

        if (search) {
            filter[Op.or] = [
                {
                    name: { [Op.like]: `%${search}%` }
                },
                {
                    surname: { [Op.like]: `%${search}%` } 
                },
                {
                    dni: { [Op.like]: `%${search}%` }
                }
            ]
        }

        if (gender) {
            filter.gender = gender
        }

        if (state) {
            filter.state = state
        }

        if (socialWorkId) {
            filter.socialWorkId = socialWorkId
        }

        const patients = await Patients.findAll({
            where: filter,
            include: [
                {
                    model: SocialsWorks,
                    attributes: ['name']
                }
            ]
        })

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

        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const patient = await Patients.findByPk(id)

        if (!patient) {
            res.status(404).json({
                msg: "El paciente no está cargado en el sistema"
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