import mongoose from 'mongoose';

const formSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    year: String,
    fromLargeFamily: Boolean,
    isDisabled: Boolean,
    fromIncompleteFamily: Boolean,
    isOrphan: Boolean,
    gender: String,
    docs: [Object],
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    status: {type: String, default: 'waiting'},
    createdAt: {type: Date, default: new Date()},
});

const Form = mongoose.model('Form', formSchema);

export default Form;