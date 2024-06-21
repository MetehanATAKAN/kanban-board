import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongo = async () => {
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1) {
        console.log('already connection');
        return;
    }
    if(connectionState === 2) {
        console.log('connection...');
        return;
    }
    try {
        mongoose.connect(MONGODB_URI, {
            dbName:'kanban-board',
            bufferCommands:true
        })
    } catch (error) {
        console.log(error);
        throw new error('Error :',error)
    }
};

export default connectMongo;
