module.exports = (express, Mongoose) => {
    var router = express.Router();

    router.use((req, res, next) => {
        console.log('route fonctionnel /apiAdmin');

        res.header('Access-Control-Allow-Origin', "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });
 
    // importation du model Amdin
    const adminModel = require("../models/admin");
    // création de la routes vers admins
    router.route('/admins')
    .get( async (req, res) => {
        try {
            var result = await adminModel.find().exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post(async (req, res) => {
        try {
            var admin = new adminModel(req.body);
            var result = await admin.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    })
    .put(async (req, res) => {
        try {
            var admin = await adminModel.findById(req.body.id).exec();
            admin.set(req.body);
            var result = await admin.save();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    router.route('/admin/:id')
    .get( async (req, res) => {
        try {
            var admin = await adminModel.findById(req.params.id).exec();
            res.send(admin);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .delete( async (req, res) => {
        try {
            var result = await adminModel.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    const auth = require("../services/auth");

    router.route('/login')
    .post(async (req, res) => {
        auth.login(req.body).then(resp => {
            res.json(resp);
        }, err => {
            res.json({
                message: 'error',
                data: err
            })
        });
    });

    return router;

};