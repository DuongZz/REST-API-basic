const bookController = require('../controllers/bookController');
const router = require('express').Router();
const bookActionsRoutes = require('../routes/bookActionsRoutes');

router.use('/actions', bookActionsRoutes);

router.get('/', bookController.getAllBook);
router.get('/num', bookController.searchBookByPageNum);
router.get('/genre', bookController.searchBookByGenre);
router.get('/:id', bookController.getABook);

module.exports = router;