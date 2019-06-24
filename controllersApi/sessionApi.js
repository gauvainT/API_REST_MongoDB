module.exports = (express, Mongoose) => {
    var router = express.Router();

    router.use((req, res, next) => {
        console.log('route fonctionnel /apiSession');

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });

    // importation du model Session
    const sessionModel = require("../models/session");
    // importation du model Apprenant
    const apprenantModel = require("../models/apprenant");
    // création de la routes vers sessions
    router.route('/sessions')
    .get( async (req, res) => {
        try {
            var result = await sessionModel.find()
            .populate('idspecialite')
            .populate('idformateur')
            .populate({ path: 'tableApprenant', populate: { path: 'tableApprenant' }})
            .exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post(async (req, res) => {
        try {
            var session = new sessionModel(req.body);
            var result = await session.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .put(async (req, res) => {
        try {
            var session = await sessionModel.findById(req.body._id).exec();
            session.set(req.body);
            var result = await session.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/sessions/:id')
    .get( async (req, res) => {
        try {
            var session = await sessionModel.findById(req.params.id)
            .populate('idspecialite')
            .populate('idformateur')
            .populate({ path: 'tableApprenant', populate: { path: 'tableApprenant' }})
            .exec();            
            res.send(session);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete( async (req, res) => {
        try {
            var result = await sessionModel.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/addApprenant/:idSession')
    .put(async (req, res) => {
        try {
            var session = await sessionModel.findById(req.params.idSession).exec();
            var apprenant = new apprenantModel(req.body);
            session.tableApprenant.push(apprenant);
            var result = await session.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;

};