const { addStation } = require('../models/station.model');
const stationModel = require('../models/station.model');

module.exports = {
    async getAllStations(req, res) {
        const data = await stationModel.loadAllStations();

        if (data && data.length > 0) {
            return res.json({
                type: 'Valid',
                data,
            });
        } else {
            return res.json({
                type: 'Invalid',
                err: 'station not found',
            });
        }
    },

    async getStationById(req, res) {
        const data = await stationModel.loadStationById(req.params.id);

        if (data) {
            return res.json({
                type: 'Valid',
                data,
            });
        }

        return res.json({
            type: 'Invalid',
            err: 'station not found',
        });
    },

    async addStation(req, res) {
        const {
            latitude,
            longitude,
            address,
            title,
            description,
            imgurl,
        } = req.body;

        const station = {
            latitude,
            longitude,
            address,
            title,
            description: description || '',
            imgurl,
        };
        const { err, data } = await stationModel.addStation(station);

        if (err) return res.json({ type: 'Invalid', err });
        return res.json({
            type: 'Valid',
            data,
        });
    },
};
