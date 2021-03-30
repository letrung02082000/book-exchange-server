const mongoose = require('mongoose');
const EventModel = require('./event.model');
const Schema = mongoose.Schema;

const eventUserSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'event' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    joined: { type: Boolean, required: true, default: false },
});

const EventUserModel = mongoose.model('eventuser', eventUserSchema);

module.exports = {
    async addUserToEvent(eventId, userId) {
        const event = await EventModel.findEventById(eventId);
        if (!event) return { err: 'event not found' };

        const deadline = new Date(event.deadline);
        if (Date.now() > deadline) return { err: 'event closed' };

        const user = await EventUserModel.find({ eventId, userId });

        if (user && user.length > 0) return { err: 'event joined' };

        const num = await EventUserModel.find({ eventId }).countDocuments();
        if (num >= event.limit) return { err: 'event full' };
        const eventUser = new EventUserModel({ eventId, userId });
        await eventUser.save();
        return { data: eventUser };
    },

    async removeUserFromEvent(eventId, userId) {
        const event = await EventModel.findEventById(eventId);
        if (!event) return { err: 'event not found' };

        const deadline = new Date(event.deadline);
        if (Date.now() > deadline) return { err: 'event closed' };

        const data = await EventUserModel.deleteMany({ eventId, userId });

        if (data) return { data };
        else return { err: 'no data' };
    },
    loadJoinedEventsByUser(userId) {
        return EventUserModel.find({
            userId: mongoose.Types.ObjectId(userId),
            joined: true,
        })
            .populate('eventId')
            .lean();
    },

    loadAllEventsByUser(userId) {
        return EventUserModel.find({
            userId: mongoose.Types.ObjectId(userId),
        })
            .populate('eventId')
            .lean();
    },

    loadJoinedUsersByEvent(eventId) {
        return EventUserModel.find({
            eventId: mongoose.Types.ObjectId(eventId),
            joined: true,
        })
            .populate('userId')
            .lean();
    },

    loadAllUsersByEvent(eventId) {
        return EventUserModel.find({
            eventId: mongoose.Types.ObjectId(eventId),
        })
            .populate('userId')
            .lean();
    },
};
