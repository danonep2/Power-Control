import express, { Response, NextFunction, Request } from 'express';
import CheckAuthMiddleware from '../middleware/auth';

import GetDevice from '../controllers/device/device';
import GetDevices from '../controllers/device/get-devices';
import SetCommand from '../controllers/device/set-command';
import GetDeviceConsumption from '../controllers/device/get-device-consumption';
import GetDevicesConsumption from '../controllers/device/get-devices-consumption';

const router = express.Router();

//user

//device
router.get('/devices', (req: Request, res: Response, next: NextFunction) => {
    GetDevices({ req, res, next });
});
router.get('/device/:id', (req: Request, res: Response, next: NextFunction) => {
    GetDevice({ req, res, next });
});
router.get('/device/consumption/:id', (req: Request, res: Response, next: NextFunction) => {
    GetDeviceConsumption({ req, res, next });
});

router.get('/devices/consumption', (req: Request, res: Response, next: NextFunction) => {
    GetDevicesConsumption({ req, res, next });
});

router.get('/set-command/:id/:newCommand', (req: Request, res: Response, next: NextFunction) => {
    SetCommand({ req, res, next })
})


export default router;