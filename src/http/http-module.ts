

import config from '../config/config.json';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


export class Http {

    // *************************************************** EXPRESS ****************************************************
    async init(cbFuntion) {
        const port = config.config_http.port_express;
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



}

//----debugger----//
const debug = {
    code: 200,
    msg: "SQL executed.",
    result: {
        empresas: [1],
        data: [{
            id: 65,
            idprofile: 1,
            iduser: "demo",
            nombre: "Demo Cocodin Technology",
            passwd: "demo",
            reseller_id: 1,
            state: 0
        }],

        length: 1,
        total: 1,
        trace: "",
    }
}
