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
};
