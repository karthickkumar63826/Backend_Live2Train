const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const trainingCenterRoutes = require('./routes/trainingCenterRoutes');
const dbConfig = require('./config/db');

const app = express();

app.use(bodyParser.json());

mongoose.connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/training-centers', trainingCenterRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
