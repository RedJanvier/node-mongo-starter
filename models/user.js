const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Provide a name']
    },
    age: {
        type: Number,
        required: [true, 'Please Provide an age']
    },
    email: {
        type: String,
        unique: [true, 'The email is already in use'],
        required: [true, 'Please Provide an email']
    },
    password: {
        type: String,
        required: [true, 'Please Provide a password']
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);