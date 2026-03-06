import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true,
    },
    order: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('List', listSchema);
