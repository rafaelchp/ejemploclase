import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import cors= require("cors");
import routes from './routes/index';

const PORT= process.env.PORT||3000;

createConnection().then(async () => {

    // create express app
    const app = express();

    //middleware
    app.use(cors());
    app.use(express.json());


    //Routes
    app.use('/api', routes);



    //start server

    app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));


    
}).catch(error => console.log(error));
