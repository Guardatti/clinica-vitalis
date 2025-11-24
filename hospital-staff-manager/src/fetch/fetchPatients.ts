import type { IUser } from "../utils/interfaceFormRegister_Login/interface";



interface IData {
    search?: string;
    gender?: string;
    socialWork?: string;

}

export const getPatients = async (data: IData = {}, currentUser: IUser | null) => {

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

        const response = await fetch(`http://localhost:8080/patients?${queryString}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "x-token": currentUser?.token
            }
        })

        console.log(response);
    
        return response
        
    } catch (error) {
        console.log(error);       
    }

} 