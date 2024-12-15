import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import User from "../../models/user";
import bcrypt from 'bcrypt';
import ApiTokens from "../../models/tokens";

interface AuthInterface {
    req: Request;
    res: Response;
    next: NextFunction
}

const Auth = async ({ req, res, next }: AuthInterface) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
        return res.status(401).send("Authentication required.");
    }

    // Decodifica credenciais do Authorization Header
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    // Verifique as credenciais
    const user = await User.findOne({ where: { username } });

    if (!user) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
        return res.status(401).send("Invalid credentials.");
    }

    //bcrypt hash
    const hash = user?.auth_hash;

    if (await bcrypt.compare(password, hash)) {
        await ApiTokens.create({})
        return next();
    }

    res.setHeader("WWW-Authenticate", 'Basic realm="Protected Area"');
    return res.status(401).send("Invalid credentials.");
}

export default Auth;