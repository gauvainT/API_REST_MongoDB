const Mongoose = require("mongoose");
 
const ApprenantSchema = Mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    diplome: {
        type: String,
        required: true
    },
    idPoleEmploi: {
        type: Number,
        required: true
    },
    indemnite: {
        type: Number,
        required: true
    },
    idsession: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: false
    }
});

const Apprenant = Mongoose.model('Apprenant', ApprenantSchema, 'Apprenant');

module.exports= Apprenant;