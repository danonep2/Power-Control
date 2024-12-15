import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Command from "../../models/commands";
import Device from "../../models/device";

import ControllerInterface from "../../interface/controller.interface"

const SetCommand = async ({ req, res, next }: ControllerInterface) => {
    try {
        const { newCommand, id } = req.params;

        const device = await Device.findOne({ where: { id } });

        if (!device) {
            throw ('Device not found')
        }

        const command = await Command.create(
            { value: newCommand, device_id: id },
        );

        res.json({ message: `Command is updated.`, newCommand });

    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: err });
    }
}

export default SetCommand