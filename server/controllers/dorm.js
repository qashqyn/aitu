import Form from '../module/form.js';
import Building from '../module/building.js';
import Room from '../module/room.js';
import RegTime from '../module/registrationTime.js';
import mongoose from 'mongoose';

export const register = async (req, res) => {
    const data = req.body;
    const newForm = new Form(data);

    try {
        const d = await newForm.save();
        res.status(201).json({...newForm});
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

        if(data.status === 'approved'){
            const rooms = await Room.find({tenants: data._id});

            for (let index = 0; index < rooms.length; index++) {
                const room = rooms[index];   
                const tens = room.tenants.filter(ten => !ten.equals(data._id));
                await Room.findByIdAndUpdate(room._id, {tenants: tens});
            }

            const room = await Room.findById(data.room);
            if(room.count === room.tenants.length)
                res.status(400).json({message: 'No more space in room'});        
            room.tenants.push(data._id);
            await Room.findByIdAndUpdate(room._id, {tenants: room.tenants});
            await Form.findByIdAndUpdate(id, { ...data, _id: id}, {new: true});
        }else{
            if(data.room){
                const room = await Room.findById(data.room);
                const tens = room.tenants.filter(tenant => !tenant.equals(data._id));
                await Room.findByIdAndUpdate(room._id, {tenants: tens}); 
            }
            await Form.findByIdAndUpdate(id, { ...data, room: null, _id: id}, {new: true});
        }
        const result = await Form.findById(id);

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

        const regTime = await RegTime.findOne();
        const totalLeft = countTotalLeft(await Building.find().populate({
            path: 'rooms',
            populate: {
                path: 'tenants',
                select: 'firstname lastname'
            }
        })); 

        res.status(200).json({data: applicants, regTime, totalLeft});
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}
export const getApplicant = async (req, res) => {
    const {id} = req.params;
    try {
        const applicants = await Form.findById(id).populate({
            path: 'room',
            populate: 'building'
        });
        
        res.status(200).json(applicants);
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
}

export const openRegistration = async (req, res) => {
    const {start, end} = req.body;
    let isOpen = false;
    const today = new Date();
    if(start < today && end > today){
        isOpen = true;
    }
    const regTime = new RegTime({start, end, isOpen});
    try {
        const result = await regTime.save();
        res.status(201).json({regTime: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

export const getRegistrationTime = async (req, res) => {
    try {
        const result = await RegTime.findOne();

        const data = await Building.find().populate({
            path: 'rooms',
            populate: {
                path: 'tenants',
                select: 'firstname lastname'
            }
        });
        const left = countTotalLeft(data);

        res.status(201).json({regTime: result, totalLeft: left});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

const countLeft = (data) => {
    let buildings = [];
    data.map((building) => {
        let rooms = [];
        let leftOnFloor = {};
        let leftOnBuilding = 0;
        for(let i=1; i<=building.floorCount; i++)
            leftOnFloor[i] = 0;
        building.rooms.map((room) => {
            let left = room.count - room.tenants.length;
            rooms.push({...room._doc, left: left});
            leftOnFloor[room.floor] += left;
            leftOnBuilding += left;
        })

        buildings.push({...building._doc, rooms: rooms, leftOnFloor, leftOnBuilding});
    })

    return buildings;
}
const countTotalLeft = (data) => {
    let left = 0;
    data.map((building) => {
        building.rooms.map((room) => {
            let l = room.count - room.tenants.length;
            left += l;
        })
    })

    return left;
}

export const getBuildings = async (req, res) => {
    try {
        const data = await Building.find().populate({
            path: 'rooms',
            populate: {
                path: 'tenants',
                select: 'firstname lastname'
            }
        });

        res.status(200).json(countLeft(data));
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

export const addBuilding = async (req, res) => {
    const data = req.body;
    const newBuilding = new Building(data);

    try {
        await newBuilding.save();
        const buildings = await Building.find().populate({
            path: 'rooms',
            populate: {
                path: 'tenants',
                select: 'firstname lastname'
            }
        });
        res.status(201).json(countLeft(buildings));
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }
}

export const addRoom = async (req, res) => {
    const data = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(data.building))
            return res.status(404).json({message: 'Building not found'});
        
        const newRoom = new Room(data);
        const room = await newRoom.save();

        const building = await Building.findById(room.building);
        building.rooms.push(room._id);

        await Building.findByIdAndUpdate(room.building, {rooms: building.rooms});

        const buildings = await Building.find().populate({
            path: 'rooms',
            populate: {
                path: 'tenants',
                select: 'firstname lastname'
            }
        });
        res.status(201).json(countLeft(buildings));
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }

}