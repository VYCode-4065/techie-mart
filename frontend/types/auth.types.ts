export interface IRegister{
    email:string;
    name:string;
    username:string;
    password:string;
    gender:'MALE'|'FEMALE'|'OTHER';
}

export interface ILogin{
    email:string;
    password:string;
}