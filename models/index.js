const mongoose = require('mongoose');

const IndexSchema = new mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Please Provide some text for the test']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Index', IndexSchema);