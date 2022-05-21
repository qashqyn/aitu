import mongoose from 'mongoose';

const regTimeSchema = mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    isOpen: {type: Boolean, default: false}
});

const RegTime = mongoose.model('RegistrationTime', regTimeSchema);

export default RegTime;