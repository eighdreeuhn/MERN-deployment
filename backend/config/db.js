const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://afgioia:afgioia@merncluster.oratvqm.mongodb.net/merntest?retryWrites=true&w=majority')
        console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline)
    }
    catch (e) {
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB