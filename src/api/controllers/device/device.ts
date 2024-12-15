import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import User from "../../models/user";
import bcrypt from 'bcrypt';
import Device from "../../models/device";
import CheckAuthMiddleware from "../../middleware/auth";

interface DeviceInterface {
    req: Request;
    res: Response;
    next: NextFunction
}

const GetDevice = async ({ req, res, next }: DeviceInterface) => {
    const { id } = req.params;
    try {
        const device = await Device.findOne({ where: { id } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        return res.status(200).json(device);

    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Device not found" });
    }
}

export default GetDevice;