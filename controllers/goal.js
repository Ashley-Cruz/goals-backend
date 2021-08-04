const { response, request } = require("express");
const Goal = require('../models/goal');

const createGoal = async(req, res = response) => {

    const {user, ...body} = req.body;
    const title = body.title.trim();

    try {

        const data = {
            ...body,
            title,
            user: req.uid
        }

        const goal = new Goal(data);

        await goal.save();
        
        res.status(201).json({
            ok: true,
            data: goal
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const getGoals = async(req, res=response) => {

    const {uid} = req;

    const query = {user: uid}
    const data = await Goal.find(query);

    res.json({
        ok: true,
        data
    })
    
}

const updateGoal = async(req = request, res=response) => {

    const {id} = req.params;
    const uid = req.uid;

    const goalFind = await Goal.findById(id);
    if(goalFind.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de editar esta meta'
        })
    }

    const {user, ...data} = req.body;
    data.user = req.uid;

    const goal = await Goal.findByIdAndUpdate(id, data, {new: true})

    res.json({
        ok: true,
        data: goal
    })
}

const deleteGoal = async(req=request, res=response) => {

    const {id} = req.params;
    const uid = req.uid;

    const goal = await Goal.findById(id);

    if(goal.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de borrar esta meta'
        })
    }

    await Goal.findByIdAndDelete(id);

    res.json({
        ok: true
    })

}

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
}