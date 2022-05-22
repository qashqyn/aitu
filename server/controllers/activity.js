import mongoose from 'mongoose';
import Activity from '../module/activity.js';

export const createActivity = async (req, res) => {
    const data = req.body;
    const newActivity = new Activity(data);
    try {
        await newActivity.save();
        const activities = await Activity.find().sort('-date');
        res.status(201).json(activities);
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }
}
export const deleteActivity = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message: 'No Activity with that Id'});
        
        await Activity.findByIdAndRemove(id);

        const activities = await Activity.find().sort('-date');
        res.status(201).json(activities);
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }
}

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort('-date');

        res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}
export const getActivity = async (req, res) => {
    const {id} = req.params;
    try {
        const activity = await Activity.findById(id);
        
        res.status(200).json(activity);
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}
