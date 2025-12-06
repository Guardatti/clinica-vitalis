import type { ILoginData, IRegisterData } from "../utils/interfaceFormRegister_Login/interface";
import { API_URL } from "../utils/util";




export const createUser = async (data: IRegisterData) => {

    try {

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: data.password
                }
            )
        })

        if (!response.ok) {
            return null
        }
        
        return await response.json()

    } catch (error) {
        console.log(error);
    }

}

export const loginUser = async (data: ILoginData) => {

    try {
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: data.email,
                    password: data.password
                }
            )
        })

        if (!response.ok) {
            return null
        }

        return await response.json()

    } catch (error) {
        console.log(error);  
    }

}