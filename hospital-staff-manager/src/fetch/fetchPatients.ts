import Swal from "sweetalert2";
import type { IUser } from "../utils/interfaceFormRegister_Login/interface";
import type { IPatient } from "../utils/patients";
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

export const getPatientById = async (currentUser: IUser | null, id: string) => {

    try {

        const data = await fetch(`${API_URL}/patients/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token || ""
            }
        })

        if (!data) {
            throw new Error('El paciente no se encuentra en la base de datos');
        }

        const response = await data.json()
        
        return response.patient
        
    } catch (error) {
        console.log(error);       
    }

}

export const createPatient = async (currentUser: IUser | null, data: IPatient) => {
    
    try {

        const response = await fetch(`${API_URL}/patients`, {
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
                title: 'No se pudo crear el paciente',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}

export const updatePatient = async (currentUser: IUser | null, data: IPatient, id: string) => {
    
    try {

        const response = await fetch(`${API_URL}/patients/${id}`, {
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
                title: 'No se pudo actualizar el paciente',
                text: errorMessage
            });

            return

        }

        return response

    } catch (error) {
        console.log(error);
    }

}