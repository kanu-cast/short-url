import { Response } from "express";


export default (res: Response, message: string, status: number, data?: any) => res.status(status).json({ message, data });