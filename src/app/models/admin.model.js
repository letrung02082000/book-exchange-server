const mongoose = require("mongoose");
const admin = new mongoose.Schema({
    username: { type: String, required: true }, //trang-chu gioi-thieu dich-vu tinh-gia-cuoc tin-tuc lien-he
    password: { type: String, required: true } //content is html code
});

const adminModel = mongoose.model("admin", admin);

module.exports = {
    async checkAdmin(_id) {
        return await adminModel.exists({ _id: _id });
    },
    findOne(query) {
        return adminModel.findOne(query);
    }
};
