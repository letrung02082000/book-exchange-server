const bookModel = require("../config/database/bookSchema");
module.exports.push = async (req, res) => {
    if (!req.body.name || !req.body.contact) {
        res.json({ type: "Invalid" });
        return;
    }
    let newbook = new bookModel(req.body);
    newbook.own = req.headers.id;
    await newbook.save();
    res.json({ type: "Valid", data: newbook });
};
module.exports.get = async (req, res) => {
    //find book in db sorted by time push
    const listbooks = await bookModel.find().sort({ pushtime: -1 });
    res.json({ type: "Valid", data: listbooks });
};
