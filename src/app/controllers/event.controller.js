const EventModel = require('../models/event.model');
const eventUserModel = require('../models/event.user.model');
const UserModel = require('../models/user.model');

module.exports = {
    async addEvent(req, res) {
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.startdate ||
            !req.body.deadline ||
            !req.body.limit ||
            !req.body.imgurl ||
            !req.body.location
        ) {
            return res.json({ type: 'Invalid', err: 'fill all fields' });
        }
        const event = {
            title: req.body.title,
            content: req.body.content,
            startdate: req.body.startdate,
            deadline: req.body.deadline,
            limit: req.body.limit,
            imgurl: req.body.imgurl,
            location: req.body.location,
            finishdate: req.body.finishdate || null,
        };
        const { data, err } = await EventModel.createEvent(event);

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async query(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let data = await EventModel.loadAllEvent(page, limit);
        const userId = req.headers.id;

        if (userId) {
            for (let event of data) {
                const isInEvent = await eventUserModel.checkUserInEvent(
                    event._id,
                    userId
                );

                if (isInEvent) {
                    event.registered = true;
                }
            }
        } else {
            for (let event of data) {
                event.registered = false;
            }
        }

        for (let event of data) {
            const data = await eventUserModel.loadAllUsersByEvent(event._id);
            event.joinnumber = data.length;
        }

        if (!data || data.length == 0)
            return res.json({ type: 'Invalid', err: 'event not found' });

        return res.json({ type: 'Valid', data });
    },

    async getEventById(req, res) {
        const data = await EventModel.findEventById(req.params.id);

        if (!data || data.length == 0)
            return res.json({ type: 'Invalid', err: 'event not found' });

        return res.json({ type: 'Valid', data });
    },

    // async joinEvent(req, res) {
    //     const { eventId } = req.body;
    //     const userId = req.headers.id;

    //     if (!eventId)
    //         return res.json({ type: 'Invalid', err: 'eventId required' });

    //     const eventData = await EventModel.addToJoinList(eventId, userId);
    //     if (eventData.err)
    //         return res.json({ type: 'Invalid', err: eventData.err });

    //     const userData = await UserModel.addToEventList(userId, eventId);
    //     if (userData.err)
    //         return res.json({ type: 'Invalid', err: userData.err });

    //     return res.json({ type: 'Valid', data: eventData.data });
    // },

    // async leaveEvent(req, res) {
    //     const { eventId } = req.body;
    //     const userId = req.headers.id;

    //     if (!eventId)
    //         return res.json({ type: 'Invalid', err: 'eventId required' });

    //     const eventData = await EventModel.removeFromJoinList(eventId, userId);

    //     if (eventData.err)
    //         return res.json({ type: 'Invalid', err: eventData.data });

    //     const userData = await UserModel.removeFromEventList(userId, eventId);

    //     if (userData.err)
    //         return res.json({ type: 'Invalid', err: userData.err });

    //     return res.json({ type: 'Valid', data: eventData.data });
    // },
};
