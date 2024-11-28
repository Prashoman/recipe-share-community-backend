import { Response } from 'express';


type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

type TResponseInner ={
    success:boolean;
    message:string | undefined;
    data:any;
    token?:string | undefined;
}
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    const response:TResponseInner = {
        success: data.success,
        message: data.message,
        data: data.data,
    };
    if(data.token){
        response.token = data.token;
    }
    res.status(data.statusCode).json(response);
};

export default sendResponse;
