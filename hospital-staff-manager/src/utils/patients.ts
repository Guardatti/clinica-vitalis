export interface IPatient {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    socialWorkId: string;
    state?: string;
    Obras_Sociale?: {
        name: string
    }
}