import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import bcrypt from 'bcrypt';
import User from "../models/user";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
        return res.status(401).send("Authentication required."); // Adicione `return`
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    const user = await User.findOne({ where: { username } });

    if (!user) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
        return res.status(401).send("Invalid credentials."); // Adicione `return`
    }

    const hash = user.auth_hash;

    if (!(await bcrypt.compare(password, hash))) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
        return res.status(401).send("Invalid credentials."); // Adicione `return`
    }

    next();
};

export default Auth;
