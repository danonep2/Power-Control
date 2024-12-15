import User from "../../models/user";
import bcrypt from 'bcrypt';
import Device from "../../models/device";
import CheckAuthMiddleware from "../../middleware/auth";

import ControllerInterface from "../../interface/controller.interface"

const GetDevice = async ({ req, res, next }: ControllerInterface) => {
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