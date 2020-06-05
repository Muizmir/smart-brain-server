const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '81a9503c90a94fae8b7bad1ac9a230ee'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json('Unable to work with Api Call')
        })
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('*')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0].entries);
            }
            else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}