import type { IUser } from "../utils/interfaceFormRegister_Login/interface";



interface IData {
    search?: string;
    state?: string;
}

export const getSocialsWorks = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.state) {
        params.state = data.state;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`http://localhost:8080/socials_works?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay obras sociales cargadas en el sistema');
        }

        const response = await data.json()
        
        return response.socialsWorks
        
    } catch (error) {
        console.log(error);       
    }

} 