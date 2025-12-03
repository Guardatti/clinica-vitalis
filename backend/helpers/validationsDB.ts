import { IPatients, Patients } from "../models/patients"
import { IProfessionals, Professionals } from "../models/professionals"
import { ISocialsWorks, SocialsWorks } from "../models/socialsWorks"
import { ISpeciality, Speciality } from "../models/speciality"
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

export const existNameSocialWork = async (name: string) => {

    const isExisting: ISocialsWorks | null = await SocialsWorks.findOne({
        where: {
            name: name
        }
    });

    if (isExisting) {

        throw new Error(`${name} ya está registrado`)

    }

}

export const existNameSocialWorkById = async (name: string, { req }: any) => {

    const isExisting: ISocialsWorks | null = await SocialsWorks.findOne({
        where: {
            name: name
        }
    });

    if (isExisting) {

        if (isExisting.id !== Number(req.params.id)) {

            throw new Error(`${name} ya está en uso por otra obra social`);

        }
        
    }

}

export const existSocialWorkById = async (id: number) => {

    const isExisting: ISocialsWorks | null = await SocialsWorks.findByPk(id)

    if (!isExisting) {

        throw new Error(`La obra social con el id ${id} no existe`);
        
    }

}

export const existNameSpeciality = async (name: string) => {

    const isExisting: ISpeciality | null = await Speciality.findOne({
        where: {
            name: name
        }
    });

    if (isExisting) {

        throw new Error(`${name} ya está registrado`)

    }

}

export const existNameSpecialityById = async (name: string, { req }: any) => {

    const isExisting: ISpeciality | null = await Speciality.findOne({
        where: {
            name: name
        }
    });

    if (isExisting) {

        if (isExisting.id !== Number(req.params.id)) {

            throw new Error(`${name} ya está en uso por otra especialidad`);

        }
        
    }

}

export const existSpecialityById = async (id: number) => {

    const isExisting: ISpeciality | null = await Speciality.findByPk(id)

    if (!isExisting) {

        throw new Error(`La especialidad con el id ${id} no existe`);
        
    }

}