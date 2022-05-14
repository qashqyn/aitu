import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dormRoutes from './routes/dorm.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb",parameterLimit: 100000, extended: true}));
app.use(cors());

app.use('/dorm', dormRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://kanat:KanatAITU2022@cluster0.uayng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));