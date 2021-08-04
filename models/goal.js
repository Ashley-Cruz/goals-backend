const { Schema, model } = require("mongoose");

const GoalSchema = Schema({

    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    state: {
        type: String,
        default: 'Pendiente',
        required: [true, 'El estado es obligatorio']
    },
    category: {
        _id: String,
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        _id: String,
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

GoalSchema.methods.toJSON = function(){
    const {__v, _id, ...goal} = this.toObject();
    goal.id = _id;
    return goal;
}

module.exports = model('Goal', GoalSchema);