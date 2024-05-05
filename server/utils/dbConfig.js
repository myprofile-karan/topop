const mongoose = require("mongoose")

console.log(process.env.MONGO_URI);

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb is connected");
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
}
module.exports = connect;