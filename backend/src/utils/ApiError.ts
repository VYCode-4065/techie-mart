export class ApiError extends Error{

    statusCode:number
    message: string;

    constructor(message:string,statusCode:number,error:string){
        super(message);

        this.message = message;
        this.cause = message;
        this.stack = error
        this.statusCode = statusCode || 500
    }
}