module.exports = (express, Mongoose) => {
    var router = express.Router();

    router.use((req, res, next) => {
        console.log('route fonctionnel /apiFormateur');

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });

    // importation du model Formateur
    const formateurModel = require("../models/formateur");
    // importation du model Session
    const sessionModel = require("../models/session");
    // création de la routes vers formateurs
    router.route('/formateurs')
    .get( async (req, res) => {
        try {
            var result = await formateurModel.find()
            .populate('idsession')
            .populate('idspecialite')
            .populate({ path: 'tableSession', populate: { path: 'tableSession' }})
            .exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post(async (req, res) => {
        try {
            var formateur = new formateurModel(req.body);
            var result = await formateur.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .put(async (req, res) => {
        try {
            var formateur = await formateurModel.findById(req.body._id).exec();
            formateur.set(req.body);
            var result = await formateur.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/formateurs/:id')
    .get( async (req, res) => {
        try {
            var formateur = await formateurModel.findById(req.params.id).exec();
            res.send(formateur);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete( async (req, res) => {
        try {
            var result = await formateurModel.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/formateurs/addSession/:idFormateur')
    .put(async (req, res) => {
        try {
            var formateur = await formateurModel.findById(req.params.idFormateur).exec();
            var session = new sessionModel(req.body);
            formateur.tableSession.push(session);
            var resultformateur = await formateur.save();
            var targetSession = await sessionModel.findById(session._id).exec();
            targetSession.idFormateur.set(formateur._id);
            var resultSession = await targetSession.save();
            res.send(resultformateur);
        } 
        catch (error) {
            res.status(500).send(error);
        }
    });


    return router;
};