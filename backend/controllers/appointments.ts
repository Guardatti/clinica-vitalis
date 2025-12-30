import { Request, Response } from "express";
import { Appointments } from "../models/appointments";
import { Professionals } from "../models/professionals";
import { Patients } from "../models/patients";
import { Speciality } from "../models/speciality";
import { Op } from "sequelize";
import { STATES_APPOINTMENTS } from "../helpers/constants";



export const createAppointment = async (req: Request, res: Response) => {

    const {patientID, professionalID, date, time, description} = req.body;

    try {
        
        const dateTimeString = `${date}T${time}:00`;

        const appointmentDate = new Date(dateTimeString);

        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({ msg: 'Fecha u hora inválida' });
        }

        const appointment = await Appointments.create({
            patientID,
            professionalID,
            date: appointmentDate,
            description
        })

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

const noshowAppointments = async () => {

    try {
        
        const now = new Date()

        await Appointments.update(
            {
                state: STATES_APPOINTMENTS.noshow
            },
            {
                where: {
                    state: STATES_APPOINTMENTS.pending,
                    date: { [Op.lt]: now }
                }
            }
        )

    } catch (error) {
        console.error('Error al cancelar turnos vencidos:', error);
    }

}

export const getAppointments = async (req: Request, res: Response) => {

    await noshowAppointments()

    try {
        
        const {search, professionalID, state} = req.query
        
        const filter: any = {}

        const filterPatient: any = {}

        if (search) {
            filterPatient[Op.or] = [
                {
                    dni: { [Op.like]: `%${search}%` }
                }
            ]
        }

        if (professionalID) {
            filter.professionalID = professionalID
        }

        if (state) {
            filter.state = state
        }

        const startOfDay = new Date()

        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()

        endOfDay.setHours(23, 59, 59, 999)

        const appointments = await Appointments.findAll({
            where: filter,
            include: [
                {
                    model: Patients,
                    attributes: ['name', 'surname', 'dni'],
                    where: filterPatient
                },
                {
                    model: Professionals,
                    attributes: ['name', 'surname', 'dni'],
                    include: [
                        {
                            model: Speciality,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            order: [['date', 'DESC']]
        }
        )

        const appointmentsOfToday = await Appointments.findAll(
            {
                where: {
                    date: {
                        [Op.between]: [startOfDay, endOfDay]
                    },
                    
                },
                include: [
                    {
                        model: Patients,
                        attributes: ['name', 'surname', 'dni'],
                    },
                    {
                        model: Professionals,
                        attributes: ['name', 'surname', 'dni'],
                    }
                ],
                order: [['date', 'ASC']]
            }
        )

        const countAppointments = await Appointments.count({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay]
                },
            }
        })

        const countCancelled = await Appointments.count({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay]
                },
                state: STATES_APPOINTMENTS.cancelled
            }
        })

        if (!appointments || !appointmentsOfToday) {
            res.status(404).json({
                msg: "No hay turnos cargados en el sistema"
            })
            return
        }

        res.status(200).json({
            appointments,
            appointmentsOfToday,
            countAppointments,
            countCancelled
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error del servidor"
        })       
    }

}

export const getAppointmentById = async (req: Request, res: Response) => {

    try {
        
        const { id } = req.params;

        const appointment = await Appointments.findByPk(id)

        if (!appointment) {

            res.status(404).json({
                msg: "El turno no está cargado en el sistema"
            })

            return
        }

        res.status(200).json({
            appointment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }

}

export const updateAppointment = async (req: Request, res: Response) => {

    const {patientID, professionalID, date, time, description, state} = req.body;

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

        const dateTimeString = `${date}T${time}:00`;

        const appointmentDate = new Date(dateTimeString);

        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({ msg: 'Fecha u hora inválida' });
        }

        await appointment.update({
            patientID,
            professionalID,
            date: appointmentDate,
            description,
            state
        });

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