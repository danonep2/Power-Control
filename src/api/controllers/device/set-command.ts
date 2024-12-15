import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Command from "../../models/commands";

interface SetCommandInterface {
    req: Request;
    res: Response;
    next: NextFunction
}
const SetCommand = async ({ req, res, next }: SetCommandInterface) => {
    try {
        const { newCommand, id } = req.params;

        const command = await Command.create(
            { value: newCommand, device_id: id },
        );

        res.send(`Command {${newCommand}} is updated.`);

    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Device not found" });
    }
}

export default SetCommand