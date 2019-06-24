module.exports = (express, Mongoose) => {
    var router = express.Router();

    router.use((req, res, next) => {
        console.log('route fonctionnel /apiSpecialite');

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });


    // importation du model Session
    const specialiteModel = require("../models/specialite");
    // création de la routes vers sessions
    router.route('/specialites')
    .get( async (req, res) => {
        try {
            var result = await specialiteModel.find()
            .populate({ path: 'tableSession', populate: { path: 'tableSession' }})
            .exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post(async (req, res) => {
        try {
            var specialite = new specialiteModel(req.body);
            var result = await specialite.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .put(async (req, res) => {
        try {
            var specialite = await specialiteModel.findById(req.body._id).exec();
            specialite.set(req.body);
            var result = await specialite.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/specialite/:id')
    .get( async (req, res) => {
        try {
            var specialite = await specialiteModel.findById(req.params.id)
            .populate({ path: 'tableSession', populate: { path: 'tableSession' }})
            .exec();
            res.send(specialite);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete( async (req, res) => {
        try {
            var result = await specialiteModel.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;

};
