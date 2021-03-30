const eventUserModel = require('../models/event.user.model');

module.exports = {
    async joinEvent(req, res) {
        const { eventId } = req.body;
        const userId = req.headers.id;

        if (!eventId)
            return res.json({ type: 'Invalid', err: 'eventId required' });

        const { data, err } = await eventUserModel.addUserToEvent(
            eventId,
            userId
        );

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async leaveEvent(req, res) {
        const { eventId } = req.body;
        const userId = req.headers.id;

        if (!eventId)
            return res.json({ type: 'Invalid', err: 'eventId required' });

        const { data, err } = await eventUserModel.removeUserFromEvent(
            eventId,
            userId
        );

        if (err) return res.json({ type: 'Invalid', err });
        if (data) return res.json({ type: 'Valid', data });
    },

    async getJoinedEventsByUser(req, res) {
        const data = await eventUserModel.loadJoinedEventsByUser(
            req.headers.id
        );

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'event not found' });
    },

    async getAllEventsByUser(req, res) {
        const data = await eventUserModel.loadAllEventsByUser(req.headers.id);

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'event not found' });
    },

    async getJoinedUsersByEvent(req, res) {
        const data = await eventUserModel.loadJoinedUsersByEvent(
            req.body.eventId
        );

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'user not found' });
    },

    async getAllUsersByEvent(req, res) {
        const data = await eventUserModel.loadAllUsersByEvent(req.body.eventId);

        if (data && data.length > 0) return res.json({ type: 'Valid', data });
        return res.json({ type: 'Invalid', err: 'user not found' });
    },
};
