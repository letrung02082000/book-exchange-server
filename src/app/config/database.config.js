mongoose = require('mongoose');
mongoose
    .connect(
        'mongodb+srv://nltd101:AHTWOt7N5KHY1hFg@cluster0.ogccp.mongodb.net/bookexchange?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch((error) => handleError(error));

handleError = (e) => {
    console.log(e);
};
