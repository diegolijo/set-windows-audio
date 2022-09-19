import { Http } from './http/http-module';
import { speaker } from 'win-audio';


/* const level = 
console.log(level); */

new class Main {

    private http: Http = new Http();


    constructor() {
        this.init();

        speaker.set(100);
    }

    private async init() {
        try {
            await this.http.init((req, res) => this.processHttp(req, res));
        } catch (err) {
            console.log(err)
        }
    }


    private async processHttp(req, res) {
        try {
            switch (req.body.accion) {
                case 'get_volume':
                    this.getVolume(req, res);
                    break;
                case 'set_volume':
                    this.setVolume(req, res);
                    break;

                default:
                    break;
            }
        } catch (err) {
            console.log(err)
            this.http.sendResponse(res, null, err);
        }
    }


    setVolume(req: any, res: any) {
        speaker.set(req.body.value);
    }


    getVolume(req: any, res: any) {
        const value = speaker.get();
        this.http.sendResponse(res, value);
    }



}
