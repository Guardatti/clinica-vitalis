import { Request, Response } from "express";
import { Appointments } from "../models/appointments";



export const createAppointment = async (req: Request, res: Response) => {

    const data = req.body;

    try {
        
        const appointment = await Appointments.create(data)

        res.status(201).json({
            appointment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })
    }

}

export const getAppointements = async (req: Request, res: Response) => {

    try {
        
        const {state, professionalID, patientID} = req.query
        
        const filter: any = {}

        if (state) {
            filter.state = state
        }

        if (professionalID) {
            filter.professionalID = professionalID
        }

        if (patientID) {
            filter.patientID = patientID
        }

        const appointments = await Appointments.findAll({
            where: filter
        }
        )

        if (!appointments) {
            res.status(404).json({
                msg: "No hay turnos cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            appointments
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}

export const updateAppointment = async (req: Request, res: Response) => {

    const data = req.body;

    const id = req.params.id

    try {
        
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                msg: "Debe enviar un ID y debe ser numérico"
            })
            return
        }

        const appointment = await Appointments.findByPk(id)

        if (!appointment) {
            res.status(404).json({
                msg: "El turno no está cargando en el sistema"
            })
            return
        }

        await appointment.update(data);

        res.status(200).json({
            appointment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}