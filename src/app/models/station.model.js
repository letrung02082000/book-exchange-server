const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
});

const StationModel = mongoose.model('station', stationSchema);

module.exports = {
    loadAllStations() {
        return StationModel.find({}).lean();
    },

    loadStationById(stationId) {
        return StationModel.findById(stationId).lean();
    },

    async addStation(station) {
        let newStation = new StationModel(station);
        const error = newStation.validateSync();

        if (error) return { err: 'validate err' };
        const data = await newStation.save();

        if (data) return { data };
    },
};
