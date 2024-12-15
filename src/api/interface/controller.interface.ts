import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express

interface ControllerInterface {
    req: Request;
    res: Response;
    next: NextFunction
}

export default ControllerInterface