const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const handlebars = require("express-handlebars");
const apiRouter = require("./routes/api.route");
const routes = require("./routes/index.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./app/config/database.config");

app.use(cookieParser("book"));
//use cors
app.use(cors());

//use bodyParser to get body in request
app.use(bodyParser.urlencoded({ extended: true }));
//listen json
app.use(
    express.json({
        type: ["application/json", "text/plain"]
    })
);

//set public
app.use(express.static(path.join(__dirname, "public")));

//set view engine
app.engine("hbs", handlebars({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use("/api", apiRouter);
//routes
// app.use("*");
// app.use("/", routes);
app.use(express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(process.env.PORT || port, () =>
    console.log(`App is listening on port ${port}`)
);
