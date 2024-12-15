import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Device from "../../models/device";

interface InfoUser {
    req: Request
    res: Response
    next: NextFunction
}

const UserInfo = async ({ req, res, next }: InfoUser) => {
    //obter usuario conectado no cabeçalho autenticado

    const { user } = req.headers;

    try {
        return res.status(200).json({ msg: true });

    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: err });
    }
}

export default UserInfo;