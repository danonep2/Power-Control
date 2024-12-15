import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Consumption from "../../models/consumption";
import ControllerInterface from "../../interface/controller.interface"
import Device from "../../models/device";


const GetDevicesConsumption = async ({ req, res, next }: ControllerInterface) => {

    const consumption = await Consumption.findAll({ include: Device });
    return res.send(consumption)
}

export default GetDevicesConsumption
