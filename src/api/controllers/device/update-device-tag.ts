import ControllerInterface from "../../interface/controller.interface"
import Device from "../../models/device";


const UpdateDeviceTag = async ({ req, res, next }: ControllerInterface) => {
    const { newTag, id } = req.params;

    try {
        const device = await Device.findOne({ where: { id } });

        if (!device) {
            throw ('Device not found')
        }

        device.tag = newTag;
        await device.save();

        return res.json({ message: 'Device is updated' })

    } catch (err) {
        return res.status(404).json({ messa: err })
    }
}

export default UpdateDeviceTag;