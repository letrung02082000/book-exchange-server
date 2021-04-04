mongoose = require('mongoose');
mongoose
    .connect(
        // 'mongodb+srv://nltd101:AHTWOt7N5KHY1hFg@cluster0.ogccp.mongodb.net/bookexchange?retryWrites=true&w=majority',
        'mongodb+srv://letrung02082000:eTuMK9pS62FoE7vS@cluster0.czhzt.mongodb.net/bookexchange?authSource=admin&replicaSet=atlas-hkflqg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(
        () => console.log('db connected!'),
        (err) => console.log(err)
    )
    .catch((error) => handleError(error));

handleError = (e) => {
    console.log(e);
};
