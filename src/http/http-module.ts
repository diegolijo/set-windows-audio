

import config from '../config/config.json';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { networkInterfaces } from 'os';


export class Http {
    // *************************************************** EXPRESS ****************************************************
    async init(cbFuntion) {
        const port = config.port_express;
        const app = express();
        app.use(cors())
        app.use(bodyParser.json({ limit: '200mb' }));                       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' })); // to support URL-encoded bodies
        app.post('/', async (req, res) => {
            cbFuntion(req, res);
        });
        app.listen(port, () => {
            console.log(`server escuchando en el puerto:${port}\n`)
        })
    }

    public sendResponse(response, result, error?, errorCode?) {
        if (!response.close) {
            if (result) {
                response.send(result);
            }
            if (error) {
                const err = { msg: error.message, stack: error.stack, code: 400 };
                if (errorCode) {
                    err['code'] = errorCode;
                }
                response.send(err);
            }
            response.close = true;
        } else {
            console.log(`Se está intentando enviar dos veces la respuesta: ${result}\n`);
        }
    }


    public getLocalNetworks() {
        const nets = networkInterfaces();
        const results = {};
        if (nets.Ethernet)
            for (const net of nets.Ethernet) {
                results[net.family] = net.address
            }
        return results;
    }

}


