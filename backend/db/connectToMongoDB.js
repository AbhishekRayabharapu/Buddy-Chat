import mongoose from 'mongoose';
 
const connectToMongoDB =async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to monogdb");

    } catch (error) {
        console.log("error connecting to mogodb", error.message)
    }
};
export default connectToMongoDB;