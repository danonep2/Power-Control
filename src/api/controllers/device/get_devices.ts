import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import User from "../../models/user";
import bcrypt from 'bcrypt';
import Device from "../../models/device";
import CheckAuthMiddleware from "../../middleware/auth";

interface DevicesInterface {
    req: Request;
    res: Response;
    next: NextFunction
}

const GetDevices = async ({ req, res, next }: DevicesInterface) => {
    const devices = await Device.findAll();

    return res.status(200).json(devices);
}

export default GetDevices;