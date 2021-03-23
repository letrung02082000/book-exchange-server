const EventModel = require('../models/event.model');

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
        const data = await EventModel.loadAllEvent(page, limit);

        if (!data || data.length == 0)
            return res.json({ type: 'Invalid', err: 'no event found' });

        return res.json({ type: 'Valid', data });
    },

    async getEventById(req, res) {
        const data = await EventModel.findEventById(req.params.id);

        if (!data || data.length == 0)
            return res.json({ type: 'Invalid', err: 'no event found' });

        return res.json({ type: 'Valid', data });
    },
};
