import Swal from "sweetalert2";
import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import type { IProfessional } from "../utils/professionals";
import { API_URL } from "../utils/util";



interface IData {
    search?: string;
    gender?: string;
    specialityID?: string;
    state?: string;

}

export const getProfessionals = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.gender) {
        params.gender = data.gender;
    }

    if (data.specialityID) {
        params.specialityID = data.specialityID;
    }

    if (data.state) {
        params.state = data.state;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`${API_URL}/professionals?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay profesionales cargados en el sistema');
        }

        const response = await data.json()

        return response
        
    } catch (error) {
        console.log(error);       
    }

}

export const getProfessionalById = async (currentUser: IUser | null, id: string) => {

    try {

        const data = await fetch(`${API_URL}/professionals/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('El profesional no se encuentra en la base de datos');
        }

        const response = await data.json()
        
        return response.professional
        
    } catch (error) {
        console.log(error);       
    }

}

export const createProfessional = async (currentUser: IUser | null, data: IProfessional) => {
    
    try {

        const response = await fetch(`${API_URL}/professionals`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            },
            body: JSON.stringify(data)
        })

        const resBody = await response.json()

        if (!response.ok) {

            let errorMessage = "Ocurrió un error inesperado";

            if (resBody.errors?.errors) {

                errorMessage = resBody.errors.errors[0].msg; 

            }

            Swal.fire({
                icon: "error",
                title: 'No se pudo crear al profesional',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}

export const updateProfessional = async (currentUser: IUser | null, data: IProfessional, id: string) => {
    
    try {

        const response = await fetch(`${API_URL}/professionals/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            },
            body: JSON.stringify(data)
        })

        const resBody = await response.json()

        if (!response.ok) {

            let errorMessage = "Ocurrió un error inesperado";

            if (resBody.errors?.errors) {

                errorMessage = resBody.errors.errors[0].msg; 

            }

            Swal.fire({
                icon: "error",
                title: 'No se pudo actualizar al profesional',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}