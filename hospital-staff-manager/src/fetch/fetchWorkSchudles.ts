import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import { API_URL } from "../utils/util";



interface IData {
    professionalID?: string;
    dayOfWeek?: string;
}

export const getWorkSchudles = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.professionalID) {
        params.professionalID = data.professionalID;
    }

    if (data.dayOfWeek) {
        params.dayOfWeek = data.dayOfWeek;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`${API_URL}/work_schedules?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay horarios cargados en el sistema');
        }

        const response = await data.json()
        
        return response.schedules
        
    } catch (error) {
        console.log(error);       
    }

} 