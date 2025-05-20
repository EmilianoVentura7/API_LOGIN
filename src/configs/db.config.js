import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const configConnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const createConnection = async () => await mysql.createConnection(configConnection);


export default { configConnection, createConnection };