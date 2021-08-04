const { Schema, model } = require("mongoose");

const UserSchema= Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, _id, ...usuario} = this.toObject(); //Todos los demás campos serán almacenados en usuario
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User', UserSchema);