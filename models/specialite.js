const Mongoose = require("mongoose");
 
const SpecialiteSchema = Mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    tableSession: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    }]
});

const Specialite = Mongoose.model('Specialite', SpecialiteSchema, 'Specialite');

module.exports= Specialite;