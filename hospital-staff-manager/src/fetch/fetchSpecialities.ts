import Swal from "sweetalert2";
import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import type { ISpeciality } from "../utils/speciality";
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

export const getSpecialityById = async (currentUser: IUser | null, id: string) => {

    try {

        const data = await fetch(`${API_URL}/specialities/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('La especialidad no se encuentra en la base de datos');
        }

        const response = await data.json()
        
        return response.speciality
        
    } catch (error) {
        console.log(error);       
    }

}

export const createSpeciality = async (currentUser: IUser | null, data: ISpeciality) => {
    
    try {

        const response = await fetch(`${API_URL}/specialities`, {
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
                title: 'No se pudo crear la especialidad',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}

export const updateSpeciality = async (currentUser: IUser | null, data: ISpeciality, id: string) => {
    
    try {

        const response = await fetch(`${API_URL}/specialities/${id}`, {
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
                title: 'No se pudo actualizar la especialidad',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}