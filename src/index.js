const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const handlebars = require('express-handlebars');

const routes = require('./routes/index.route');

//set public
app.use(express.static(path.join(__dirname, 'public')));

//set view engine
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes
app.use('/', routes);

app.listen(process.env.PORT || port, () =>
    console.log(`App is listening on port ${port}`)
);
