import express from 'express'
import { PORT } from '../config';

export default class Server { 

    public app: express.Application;
    public port: string  = PORT;

    constructor() {
        this.app = express();
    }

    start(callback : Function) {
        this.app.listen( this.port );
        callback();
    }
}