import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dormRoutes from './routes/dorm.js';

const app = express();

app.use(bodyParser.json({linit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({linit: "30mb", extended: true}));
app.use(cors());

app.use('/dorm', dormRoutes);

const CONNECTION_URL = 'mongodb+srv://kanat:KanatAITU2022@cluster0.uayng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));