import type { IUser } from "../utils/interfaceFormRegister_Login/interface";



interface IData {
    search?: string;
    gender?: string;
    socialWork?: string;

}

export const getProfessionals = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.gender) {
        params.gender = data.gender;
    }

    if (data.socialWork) {
        params.socialWork = data.socialWork;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const response = await fetch(`http://localhost:8080/professionals?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!response) {
            throw new Error('No hay profesionales cargados en el sistema');
        }

        return await response.json()
        
    } catch (error) {
        console.log(error);       
    }

} 