import express, { Response, NextFunction, Request } from 'express';
import GetDevices from '../controllers/device/get_devices';
import CheckAuthMiddleware from '../middleware/auth';
import GetDevice from '../controllers/device/device';

const router = express.Router();

//user

//device
router.get('/devices', (req: Request, res: Response, next: NextFunction) => {
    GetDevices({ req, res, next });
});
router.get('/device/:id', (req: Request, res: Response, next: NextFunction) => {
    GetDevice({ req, res, next });
});

export default router;