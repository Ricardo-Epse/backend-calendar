const {
    Schema,
    model
} = require('mongoose');
var mongoose = require('mongoose');

const EventoSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    notes : {
        type : String,
    },
    start : {
        type: Date,
        requiered: true
    },
    end : {
        type: Date,
        requiered: true
    },

    user : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    }
});
 
EventoSchema.method('toJSON', function(){
    const { __v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
});
 
module.exports = {
    Evento: mongoose.model('Evento', EventoSchema)
}