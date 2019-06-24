const Mongoose = require("mongoose");
 
const SessionSchema = Mongoose.Schema({
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    idspecialite: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Specialite',
        required: true
    },
    idformateur: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Formateur',
        required: true
    },
    tableApprenant: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Apprenant',
        required: true
    }]
});

const Session = Mongoose.model('Session', SessionSchema, 'Session');

module.exports= Session;