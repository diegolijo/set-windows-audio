
import { Server } from 'socket.io';
import { createServer } from "http";
import config from '../config/config.json';


export class Socket {

    async init(cbFuntion) {
        const httpServer = createServer();
        const port = config.port_socket;
        const io = new Server(httpServer, { cors: { origin: '*' } });
        console.log('init socket');
        io.on('connection', (socket) => {

            console.log('connection socket ' + JSON.stringify(socket.handshake.query));

            socket.once('disconnect', () => {
                console.log('disconnect socket ' + JSON.stringify(socket.handshake.query));

            });

            socket.on('value', (data) => {
                console.log('value ' + data.value);
                cbFuntion(data.value);
                io.to(socket.id).emit('response', {});
            });
        });

        httpServer.listen(port);
    }

}



