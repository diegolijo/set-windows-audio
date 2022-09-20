import { Http } from './http/http-module';
import { Socket } from './http/socket-module';
import { speaker } from 'win-audio';


/* const level = 
console.log(level); */

new class Main {

    private http: Http = new Http();
    private socket: Socket = new Socket();

    constructor() {
        this.init();

        speaker.set(100);
    }

    private async init() {
        try {
            await this.http.init((req, res) => this.processHttp(req, res));
            await this.socket.init((value) => this.processSocketMsg(value));
        } catch (err) {
            console.log(err)
        }
    }


    processSocketMsg(value: any) {
        console.log(JSON.stringify(value));
        this.setVolume(value);
    }


    private async processHttp(req, res) {
        try {
            switch (req.body.accion) {
                case 'get_volume':
                    this.getVolume(req, res);
                    break;
                case 'set_volume':
                    this.setVolume(req.body.value)
                    break;

                default:
                    break;
            }
        } catch (err) {
            console.log(err)
            this.http.sendResponse(res, null, err);
        }
    }


    setVolume(value) {
        speaker.set(value);
    }


    getVolume(req: any, res: any) {
        const value = speaker.get();
        this.http.sendResponse(res, { value: value });
    }



}
