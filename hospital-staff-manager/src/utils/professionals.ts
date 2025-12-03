export interface IProfessional {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: Date;
    gender: string;
    address: string;
    phone: string;
    email: string;
    specialityID: string;
    state: string;
    Especialidade?: {
        name: string
    }
}