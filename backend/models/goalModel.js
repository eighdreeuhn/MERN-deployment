const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a value']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Goal', GoalSchema)