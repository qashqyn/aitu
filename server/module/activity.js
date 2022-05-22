import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    image: String,
    title: String,
    text: String,
    link: String,
    date: Date,
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
