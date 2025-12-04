require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const providerRoutes = require('./routes/provider');
const publicRoutes = require('./routes/public');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/patient', patientRoutes);
app.use('/provider', providerRoutes);
app.use('/public', publicRoutes);

app.get('/', (req, res) => {
  res.send('Healthcare API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
