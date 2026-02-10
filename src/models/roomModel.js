const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
        min: [100, 'Room number mustbe 3 digits'],
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
     guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest' // Connects to Guest model
    },
    maintenanceLog: [
        {
            date: { type: Date, default: Date.now },
            issue: String, // e.g., "brokrn AC"
            fixed: Boolean
        }
    ],
    features: [String],
});

module.exports = mongoose.model('Room', roomSchema);
