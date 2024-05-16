const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    task: { // Changed field name to 'task' for clarity
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "false"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", TodoSchema);
