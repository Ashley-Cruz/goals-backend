const { Router } = require("express");
const { check } = require("express-validator");
const { createGoal, getGoals, updateGoal, deleteGoal } = require("../controllers/goal");
const { existCategoryById, existUserById, includesValidState, lengthValid, existGoalById } = require("../helpers/db-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const {validateResults} = require("../middlewares/validate-results");

const router = Router();

router.post('/', [
    validateJWT,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('title').custom(lengthValid),
    check('state', 'El estado es obligatorio').not().isEmpty(),
    check('state').custom(c => includesValidState(c, ['Pendiente', 'Finalizado'])),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('category', 'No es una categoría válida').isMongoId(),
    check('category').custom(existCategoryById),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('user', 'No es un usuario válido').isMongoId(),
    check('user').custom(existUserById),
    validateResults
], createGoal)

router.get('/', [
    validateJWT,
    validateResults
], getGoals)

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existGoalById),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('title').custom(lengthValid),
    check('state', 'El estado es obligatorio').not().isEmpty(),
    check('state').custom(c => includesValidState(c, ['Pendiente', 'Finalizado'])),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('category', 'No es una categoría válida').isMongoId(),
    check('category').custom(existCategoryById),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('user', 'No es un usuario válido').isMongoId(),
    check('user').custom(existUserById),
    validateResults
], updateGoal)

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existGoalById),
    validateResults
], deleteGoal)

module.exports = router;