import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
    name: {type: String, unique: true},
    gender: String,
    floorCount: Number,
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}],
});

const Room = mongoose.model('Building', buildingSchema);

export default Room;
