import { Request, Response, NextFunction } from "express"; // Importe Request e Response do Express
import Consumption from "../../models/consumption";
import ControllerInterface from "../../interface/controller.interface"
import Device from "../../models/device";
import path from "path";
import fs from "fs";
import os from "os";


const GetDeviceConsumption = async ({ req, res, next }: ControllerInterface) => {
    const { id } = req.params;
    const { download } = req.query

    try {
        const { download } = req.query;

        // Buscar dados de consumo com a inclusão do dispositivo
        const consumption = await Consumption.findAll({ where: { device_id: id } });

        // Criar um arquivo JSON temporário no diretório temporário do sistema
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, `${id}-consumption.json`);

        // Escrever os dados de consumo no arquivo temporário
        fs.writeFileSync(tempFilePath, JSON.stringify(consumption, null, 2));

        if (download === "true") {
            // Enviar o arquivo temporário para o usuário
            res.download(tempFilePath, `${id}-consumption.json`, (err) => {
                if (err) {
                    return next(err);
                }

                // Após o envio, excluir o arquivo temporário
                fs.unlink(tempFilePath, (err) => {
                    if (err) {
                        console.error("Erro ao excluir o arquivo temporário:", err);
                    }
                });
            });
        } else {
            // Se não for para baixar, apenas retornar os dados
            return res.json(consumption);
        }
    } catch (err) {
        return res.status(404).json({ message: err, id })
    }
}

export default GetDeviceConsumption