import { IPatients, Patients } from "../models/patients"
import { IProfessionals, Professionals } from "../models/professionals"
import { IUser, User } from "../models/user"



export const existEmail = async (email: string): Promise<void> => {

    const isExisting: IUser | null = await User.findOne({
        where: {
            email: email
        }
    })

    if (isExisting) {

        throw new Error(`El email ${email} ya está registrado`)

    }

}

export const existDNIPatient = async (dni: number): Promise<void> => {

    const isExisting: IPatients | null = await Patients.findOne({
        where: {
            dni: dni
        }
    })

    if (isExisting) {

        throw new Error(`El DNI ${dni} ya está registrado`)

    }

}

export const existDNIPatientById = async (dni: number, { req }: any) => {

    const isExisting = await Patients.findOne({
        where: {
            dni: dni
        }
    });

    if (isExisting) {

        if (isExisting.id !== Number(req.params.id)) {

            throw new Error(`El DNI ${dni} ya está en uso por otro paciente`);
            
        }

    }

}

export const existDNIProfessional = async (dni: number): Promise<void> => {

    const isExisting: IProfessionals | null = await Professionals.findOne({
        where: {
            dni: dni
        }
    })

    if (isExisting) {

        throw new Error(`El DNI ${dni} ya está registrado`)

    }

}

export const existDNIProfessionalById = async (dni: number, { req }: any) => {

    const isExisting = await Professionals.findOne({
        where: {
            dni: dni
        }
    });

    if (isExisting) {

        if (isExisting.id !== Number(req.params.id)) {

            throw new Error(`El DNI ${dni} ya está en uso por otro profesional`);
            
        }

    }

}