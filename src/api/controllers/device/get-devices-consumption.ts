import { Request, Response, NextFunction } from "express";
import Consumption from "../../models/consumption";
import ControllerInterface from "../../interface/controller.interface";
import Device from "../../models/device";
import path from "path";
import fs from "fs";
import os from "os";

const GetDevicesConsumption = async ({ req, res, next }: ControllerInterface) => {
    try {
        const { download } = req.query;

        // Buscar dados de consumo com a inclusão do dispositivo
        const consumption = await Consumption.findAll({ include: Device });

        // Criar um arquivo JSON temporário no diretório temporário do sistema
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, "devices-consumption.json");

        // Escrever os dados de consumo no arquivo temporário
        fs.writeFileSync(tempFilePath, JSON.stringify(consumption, null, 2));

        if (download === "true") {
            // Enviar o arquivo temporário para o usuário
            res.download(tempFilePath, "devices-consumption.json", (err) => {
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
    } catch (error) {
        // Em caso de erro, passar para o próximo middleware
        return next(error);
    }
};

export default GetDevicesConsumption;
