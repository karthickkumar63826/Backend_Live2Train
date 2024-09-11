const TrainingCenter = require('../models/TrainingCenter');

exports.createTrainingCenter = async (req, res, next) => {
    try {
        const { centerName, centerCode, address, studentCapacity, coursesOffered, contactEmail, contactPhone } = req.body;

        const newTrainingCenter = new TrainingCenter({
            centerName,
            centerCode,
            address,
            studentCapacity,
            coursesOffered,
            contactEmail,
            contactPhone
        });

        const savedCenter = await newTrainingCenter.save();
        res.status(201).json(savedCenter);
    } catch (err) {
        next(err);
    }
};

exports.getTrainingCenters = async (req, res, next) => {
    try {
        const trainingCenters = await TrainingCenter.find({});
        res.status(200).json(trainingCenters);
    } catch (err) {
        next(err);
    }
};
