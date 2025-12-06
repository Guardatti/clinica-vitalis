export interface IWorkSchedule {
    id: number,
    professionalID: number,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    Profesionale?: {
        name: string,
        surname: string,
        dni: number,
    }
}

export const DAYS_OF_WEEK = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado" 
];