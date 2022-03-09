const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Bd Online')
    } catch (error) {
        console.log('Error initializing DB')
    }
}

module.exports = {
    dbConnection
}