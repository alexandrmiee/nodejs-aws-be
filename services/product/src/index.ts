import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    console.log("Connected to DB", {connection});

}).catch(error => console.log(error));
