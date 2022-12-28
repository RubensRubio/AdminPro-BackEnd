const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MongoConn);
        console.log('DB Online!!!');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la BD!!!');
    }

}

module.exports = {
    dbConnection
}