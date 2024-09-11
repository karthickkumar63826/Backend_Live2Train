const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = new mongoose.Schema({
    detailedAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, minlength: 6, maxlength: 6 }
});

const trainingCenterSchema = new mongoose.Schema({
    centerName: { type: String, required: true, maxlength: 40 },
    centerCode: {
        type: String, required: true, unique: true, minlength: 12, maxlength: 12,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: 'CenterCode must be alphanumeric and 12 characters long'
        }
    },
    address: { type: addressSchema, required: true },
    studentCapacity: { type: Number },
    coursesOffered: { type: [String] },
    createdOn: { type: Number, default: () => Math.floor(Date.now() / 1000) },
    contactEmail: {
        type: String,
        validate: [validator.isEmail, 'Invalid email format'],
        required: false
    },
    contactPhone: {
        type: String, required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone number must be 10 digits'
        }
    }
});

module.exports = mongoose.model('TrainingCenter', trainingCenterSchema);
