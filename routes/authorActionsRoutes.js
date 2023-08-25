const authorController = require('../controllers/authorController');
const router = require('express').Router();

router.post('/', authorController.addAuthor);
router.delete('/:id',authorController.deleteAuthors);
router.put('/:id',authorController.updateAuthor);

module.exports = router;