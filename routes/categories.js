const {Router} = require('express');
const { check } = require('express-validator');
const {createCategory, getCategories} = require('../controllers/categories');
const { lengthValid, existCategoryByName, existCategoryByColor, existCategoryByIcon } = require('../helpers/db-validator');
const {validateResults} = require('../middlewares/validate-results');

const router = Router();

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom(lengthValid),
    check('name').custom(existCategoryByName),
    check('color', 'El color es obligatorio').not().isEmpty(),
    check('color').custom(lengthValid),
    check('color').custom(existCategoryByColor),
    check('icon', 'El icono es obligatorio').not().isEmpty(),
    check('icon').custom(lengthValid),
    check('icon').custom(existCategoryByIcon),
    validateResults
], createCategory)

router.get('/', getCategories)

module.exports = router;