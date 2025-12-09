import Swal from "sweetalert2";
import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import type { ISocialWork } from "../utils/socialsWorks";
import { API_URL } from "../utils/util";



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

        const data = await fetch(`${API_URL}/socials_works?${queryString}`, {
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

export const createSocialWork = async (currentUser: IUser | null, data: ISocialWork) => {
    
    try {

        const response = await fetch(`${API_URL}/socials_works`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {

            Swal.fire({
                icon: "error",
                title: "¡Obra social ya existente!",
            });

            return
        }

        return response

    } catch (error) {
        console.log(error);
    }

}