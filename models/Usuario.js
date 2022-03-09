const {
    Schema,
    model
} = require('mongoose');
var mongoose = require('mongoose');
 
const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
 
 
module.exports = {
    Usuario: mongoose.model('Usuario', UsuarioSchema)
}