import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import { API_URL } from "../utils/util";



interface IData {
    search?: string;
    state?: string;
}

export const getSpecialities = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.state) {
        params.state = data.state;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`${API_URL}/specialities?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay especialidades cargadas en el sistema');
        }

        const response = await data.json()
        
        return response.specialities
        
    } catch (error) {
        console.log(error);       
    }

} 