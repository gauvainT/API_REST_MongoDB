module.exports = (express, Mongoose) => {
    var router = express.Router();

    router.use((req, res, next) => {
        console.log('route fonctionnel /apiApprenant');

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });
 
    // importation du model Apprenant
    const apprenantModel = require("../models/apprenant");
    // création de la routes vers apprenants
    router.route('/apprenants')
    .get( async (req, res) => {
        try {
            var result = await apprenantModel.find().populate('idsession').exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post(async (req, res) => {
        try {
            var apprenant = new apprenantModel(req.body);
            var result = await apprenant.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .put(async (req, res) => {
        try {
            var apprenant = await apprenantModel.findById(req.body._id).exec();
            apprenant.set(req.body);
            var result = await apprenant.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/apprenants/:id')
    .get( async (req, res) => {
        try {
            var apprenant = await apprenantModel.findById(req.params.id).populate('idsession').exec();
            res.send(apprenant);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete( async (req, res) => {
        try {
            var result = await apprenantModel.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;

};