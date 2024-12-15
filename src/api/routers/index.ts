import express, { Response, NextFunction, Request } from 'express';
import Auth from '../controllers/user/auth';

const router = express.Router();

router.get('/auth', (req: Request, res: Response, next: NextFunction) => {
    Auth({ req, res, next });
});

export default router;