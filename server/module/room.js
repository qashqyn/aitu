import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    building: {type: mongoose.Schema.Types.ObjectId, ref: 'Building'},
    floor: Number,
    apartment: String,
    count: {type: Number, default: 6},
    tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Form'}],
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
