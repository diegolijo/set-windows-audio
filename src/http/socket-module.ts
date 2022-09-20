
import { Server } from 'socket.io';
import { createServer } from "http";
import config from '../config/config.json';
import { speaker } from 'win-audio';


export class Socket {

    async init(cbFuntion) {
        const httpServer = createServer();
        const port = config.port_socket;
        const io = new Server(httpServer, { cors: { origin: '*' } });

        io.on('connection', (socket) => {

            socket.once('disconnect', () => {
                console.log('disconnect socket ' + JSON.stringify(socket.handshake.query));
            });

            socket.on('value', (data) => {
                console.log('value ' + data.value);
                cbFuntion(data.value);
                io.emit('response', { changeValue: data.value });
            });

            console.log('connection socket ' + JSON.stringify(socket.handshake.query));
            io.to(socket.id).emit('connected', { initialValue: speaker.get() });
        });

        httpServer.listen(port);
        console.log('socket listen on port ' + port);
    }

}



