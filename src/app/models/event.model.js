const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    pending: { type: Boolean, default: false },
    createdate: { type: Date, default: Date.now },
    startdate: { type: Date, required: true },
    finishdate: { type: Date },
    deadline: { type: Date, required: true },
    location: { type: String, required: true },
    // joinlist: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    title: { type: String, require: true },
    content: { type: String, require: true },
    limit: { type: Number, required: true },
    imgurl: { type: String, required: true },
    point: { type: Number, required: true, default: 0 },
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
            .limit(limit)
            .lean();
    },

    async createEvent(event) {
        let newEvent = new EventModel(event);
        newEvent.pending = true;
        const err = newEvent.validateSync();

        if (err) return { err: 'create post fail' };

        await newEvent.save();
        return { data: newEvent };
    },

    // async addToJoinList(eventId, userId) {
    //     const event = await EventModel.findById(eventId);

    //     if (!event) return { err: 'event not found' };

    //     const deadline = new Date(event.deadline);

    //     if (Date.now() > deadline) return { err: 'event closed' };

    //     if (event.joinlist.length == event.limit) return { err: 'event full' };

    //     if (event.joinlist.includes(mongoose.Types.ObjectId(userId)))
    //         return { err: 'event joined' };

    //     event.joinlist.push(mongoose.Types.ObjectId(userId));
    //     await event.save();
    //     return { data: event };
    // },

    // async removeFromJoinList(eventId, userId) {
    //     const event = await EventModel.findById(eventId);

    //     if (!event) return { err: 'event not found' };

    //     const deadline = new Date(event.deadline);

    //     if (Date.now() > deadline) return { err: 'event closed' };

    //     if (event.joinlist.includes(mongoose.Types.ObjectId(userId))) {
    //         let tmp = event.joinlist.filter((child) => child != userId);
    //         event.joinlist = tmp;
    //     }

    //     await event.save();
    //     return { data: event };
    // },
};
