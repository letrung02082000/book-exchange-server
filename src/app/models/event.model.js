const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    pending: { type: Boolean, default: false },
    createdate: { type: Date, default: Date.now },
    startdate: { type: Date, required: true },
    finishdate: { type: Date },
    deadline: { type: Date, required: true },
    location: { type: String, required: true },
    joinlist: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    title: { type: String, require: true },
    content: { type: String, require: true },
    limit: { type: Number, required: true },
    imgurl: { type: String, required: true },
});

const EventModel = mongoose.model('event', eventSchema);

module.exports = {
    async findEventById(id) {
        return await EventModel.findById(id);
    },

    loadAllEvent(page, limit) {
        return EventModel.find()
            .sort({ createdate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    },

    async createEvent(event) {
        let newEvent = new EventModel(event);
        const err = newEvent.validateSync();

        if (err) return { err: 'create post fail' };

        await newEvent.save();
        return { data: newEvent };
    },
};
