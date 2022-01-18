const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/webchat`;
const DB_NAME = 'webchat';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = null;

const getConnection = () => (connection
    ? Promise.resolve(connection)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((conn) => {
            const db = conn.db(DB_NAME);
            return db;
        })
);

module.exports = { getConnection };