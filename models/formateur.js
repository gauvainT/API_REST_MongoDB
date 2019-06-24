const Mongoose = require("mongoose");
 
const FormateurSchema = Mongoose.Schema({
    nom: {
        type: String,
        required: false
    },
    prenom: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    identifiant: {
        type: String,
        required: false
    },
    salaire: {
        type: Number,
        required: false
    },
    idsession: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: false
    },
    idspecialite: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Specialite',
        required: false
    },
    tableSession: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    }]
});

const Formateur = Mongoose.model('Formateur', FormateurSchema, 'Formateur');

module.exports= Formateur;