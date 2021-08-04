const { response } = require('express');
const Category = require('../models/category');

const createCategory = async(req, res = response) => {

    const name = req.body.name.trim();
    const color = req.body.color.trim();
    const icon = req.body.icon.trim();

    try {

        const data = {name, color, icon};
        const category = new Category(data);

        await category.save();

        res.status(201).json({
            ok: true,
            data: {
                name,
                color,
                icon,
                id: category.id
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const getCategories = async(req, res = response) => {

    const data = await Category.find();

    res.json({
        ok: true,
        data
    });
}

module.exports = {
    createCategory,
    getCategories
}