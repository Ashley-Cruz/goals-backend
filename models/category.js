const { Schema, model } = require("mongoose");

const CategorySchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'El color es obligatorio']
    },
    icon: {
        type: String,
        required: [true, 'El icono es obligatorio']
    }

})

CategorySchema.methods.toJSON = function(){
    const {__v, _id, ...category} = this.toObject();
    category.id = _id;
    return category;
}

module.exports = model('Category', CategorySchema);