import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import User from "../../models/user";
import bcrypt from 'bcrypt';
import Device from "../../models/device";
import CheckAuthMiddleware from "../../middleware/auth";

import ControllerInterface from "../../interface/controller.interface"

const GetDevices = async ({ req, res, next }: ControllerInterface) => {
    const devices = await Device.findAll();

    return res.status(200).json(devices);
}

export default GetDevices;