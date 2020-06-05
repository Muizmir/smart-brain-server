import { App } from 'clarifai';

const app = new App({
    apiKey: 'd40cbf80aa7d45a6905d41b6aa2df353'
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

export const handleImage = handleImage;
export const handleApiCall = handleApiCall;