const {Router} = require('express');
const {check} = require('express-validator');
const {googleLogin, revalidateToken} = require('../controllers/auth');
const {validateResults} = require('../middlewares/validate-results');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check('tokenId', 'El token es necesario').not().isEmpty(),
    validateResults
], googleLogin)

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;