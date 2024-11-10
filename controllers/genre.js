const Genre =  require('../models/Genre');

exports.list = (req, res) => {
    Genre.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured'});
        });
};

exports.details = (req, res) => {
    Genre.findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured'});
        });
};

exports.create = (req, res) => {
    const newGenre = new Genre(req.body);
    newGenre.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};

exports.update = (req, res) => {
    Genre.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};

exports.delete = (req, res) => {
    Genre.findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Error occured' });
        });
};