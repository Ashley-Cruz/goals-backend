const Category = require('../models/category');
const Goal = require('../models/goal');
const User = require('../models/user');

const existCategoryByName = async(name) => {
    const existCategory = await Category.findOne({name});
    if(existCategory){
        throw new Error(`La categoría ${name} ya existe`)
    }
}

const existCategoryByColor = async(color) => {
    const existCategory = await Category.findOne({color});
    if(existCategory){
        throw new Error(`El color ${color} ya existe`)
    }
}

const existCategoryByIcon = async(icon) => {
    const existCategory = await Category.findOne({icon});
    if(existCategory){
        throw new Error(`El icono ${icon} ya existe`)
    }
}

const existCategoryById = async(id) => {
    const existCategory = await Category.findById(id);
    if(!existCategory){
        throw new Error('La categoría no existe')
    }
}

const existGoalById = async(id) => {
    const existGoal = await Goal.findById(id);
    if(!existGoal){
        throw new Error('La meta no existe')
    }
}

const existUserById = async(id) => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error('El usuario no existe')
    }
}

const includesValidState = (state='', validSates=[]) => {
    const includes = validSates.includes(state);
    if(!includes){
        throw new Error('No es un estado válido')
    }
    return true;
}

const lengthValid = (name) => {
    if(name.trim().length <= 1){
        throw new Error('Son muy pocos caracteres, intente con algo diferente')
    }
    return true;
}

module.exports = {
    existCategoryByName,
    existCategoryByColor,
    existCategoryByIcon,
    existCategoryById,
    existGoalById,
    existUserById,
    includesValidState,
    lengthValid
}