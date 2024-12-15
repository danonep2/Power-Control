import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Consumption from "../../models/consumption";
import ControllerInterface from "../../interface/controller.interface"
import Device from "../../models/device";


const GetDeviceConsumption = async ({ req, res, next }: ControllerInterface) => {
    const { id } = req.params;
    const { download } = req.query

    try {
        const device = await Device.findOne({ where: { id } })
        if (!device) {
            throw ('Device not found');
        }

        const consumption = await Consumption.findAll({ where: { device_id: id } })

        return res.send(consumption);
    } catch (err) {
        return res.status(404).json({ message: err, id })
    }
}

export default GetDeviceConsumption