const authorController = require('../controllers/authorController');
const router = require('express').Router();
const authorActionsRoutes = require('../routes/authorActionsRoutes');

router.use('/actions', authorActionsRoutes);

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAnAuthor);

module.exports = router;

