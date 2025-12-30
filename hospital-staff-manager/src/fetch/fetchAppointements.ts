import Swal from "sweetalert2";
import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import { API_URL } from "../utils/util";
import type { IAppointment } from "../utils/appointments";




interface IData {
    search?: string;
    professionalID?: string;
    state?: string;

}

export const getAppointments = async (currentUser: IUser | null, data: IData = {}) => {

    const params: Record<string, string> = {};
    
    if (data.search) {
        params.search = data.search;
    }

    if (data.professionalID) {
        params.professionalID = data.professionalID;
    }

    if (data.state) {
        params.state = data.state;
    }

    const queryString = new URLSearchParams(params).toString();

    try {

        const data = await fetch(`${API_URL}/appointments?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('No hay turnos cargados en el sistema');
        }

        const response = await data.json()
        
        return response
        
    } catch (error) {
        console.log(error);       
    }

}

export const getAppointmentsById = async (currentUser: IUser | null, id: string) => {

    try {

        const data = await fetch(`${API_URL}/appointments/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('El turno no se encuentra en la base de datos');
        }

        const response = await data.json()
        
        return response.appointment
        
    } catch (error) {
        console.log(error);       
    }

}


export const createAppointment = async (currentUser: IUser | null, data: IAppointment) => {
    
    try {

        const response = await fetch(`${API_URL}/appointments`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            },
            body: JSON.stringify(data)
        })

        const resBody = await response.json();

        if (!response.ok) {

            let errorMessage = "Ocurrió un error inesperado";

            if (resBody.errors?.errors) {

                errorMessage = resBody.errors.errors[0].msg; 

            }

            Swal.fire({
                icon: "error",
                title: "No se pudo crear el turno",
                text: errorMessage,
            });

            return

        }

        return resBody

    } catch (error) {
        console.log(error);
    }

}

export const updateAppointment = async (currentUser: IUser | null, data: IAppointment, id: string) => {
    
    try {

        const response = await fetch(`${API_URL}/appointments/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            },
            body: JSON.stringify(data)
        })

        const resBody = await response.json();

        if (!response.ok) {

            let errorMessage = "Ocurrió un error inesperado";

            if (resBody.errors?.errors) {

                errorMessage = resBody.errors.errors[0].msg; 

            }

            Swal.fire({
                icon: "error",
                title: "No se pudo crear el turno",
                text: errorMessage,
            });

            return

        }

        if (!response.ok) {

            Swal.fire({
                icon: "error",
                title: "¡Ha ocurrido un problema!",
            });

            return
        }

        return response

    } catch (error) {
        console.log(error);
    }

}