export interface IProfessional {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    specialityID: string;
    state?: string;
    Especialidade?: {
        name: string
    }
    Horarios_Trabajo?: {
        dayOfWeek: number;
        startTime: string;
        endTime: string;
    }
}