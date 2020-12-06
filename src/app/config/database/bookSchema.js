const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, default: "0đ" },
    type: { type: String, default: "donation" }, //donation or sell
    imageurl: { type: String, default: null },
    description: { type: String, default: "" },
    own: { type: String },
    contact: { type: String, required: true },
    pushtime: { type: Date, default: Date.now() }
});
module.exports = mongoose.model("book", bookSchema);
