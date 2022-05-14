import Form from '../module/form.js';
import mongoose from 'mongoose';

export const register = async (req, res) => {
    const data = req.body;
    const newForm = new Form(data);

    try {
        const d = await newForm.save();
        res.status(201).json({...newForm, status: 'waiting'});
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }
}

export const changeStatus = async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try{
        // if(!req.userId) return res.json({message: "Unaithenticated"});
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({message: 'Applicant not found'});
        const result = await Form.findByIdAndUpdate(id, { ...data, _id: id}, {new: true});
        
        res.status(204).json({ result });
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    const { status } = req.query;
    try {
        let applicants;
        if(status === 'all')
            applicants = await Form.find().select('-docs').sort('-isDisabled -isOrphan -fromIncompleteFamily -fromLargeFamily -createdAt');
        else    
            applicants = await Form.find().select('-docs').where('status').equals(status).sort('-isDisabled -isOrphan -fromIncompleteFamily -fromLargeFamily -createdAt');

        res.status(200).json(applicants);
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}
export const getApplicant = async (req, res) => {
    const {id} = req.params;
    try {
        const applicants = await Form.findById(id);
        
        res.status(200).json(applicants);
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}