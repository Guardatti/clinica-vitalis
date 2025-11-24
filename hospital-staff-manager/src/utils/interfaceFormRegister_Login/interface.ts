export interface ILoginData {
    email: string,
    password: string,
}

export interface IUser {
    name: string,
    surname: string,
    email: string,
    rol: string,
    token: string;
}

export interface IRegisterData {
    name: string
    surname: string
    email: string
    password: string
}