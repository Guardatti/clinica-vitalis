import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import { API_URL } from "../utils/util";



interface IData {
    search?: string;
    gender?: string;
    socialWorkId?: string;
    state?: string;

}

export const getPatients = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.gender) {
        params.gender = data.gender;
    }

    if (data.socialWorkId) {
        params.socialWorkId = data.socialWorkId;
    }

    if (data.state) {
        params.state = data.state;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`${API_URL}/patients?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay pacientes cargados en el sistema');
        }

        const response = await data.json()
        
        return response.patients
        
    } catch (error) {
        console.log(error);       
    }

}