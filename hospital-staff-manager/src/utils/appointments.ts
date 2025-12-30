export interface IAppointment {
    id: string,
    patientID: string,
    professionalID: string
    date: string,
    time: string,
    description: string,
    state?: string,
    Paciente?:{
        name: string,
        surname: string,
        dni: number,
    },
    Profesionale?:{
        name: string,
        surname: string,
        dni: number,
        Especialidade?:{
            name: string,
        }
    }
}