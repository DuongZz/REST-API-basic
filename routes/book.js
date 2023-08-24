const bookController = require('../controllers/bookController');

const router = require('express').Router();

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getABook);
router.delete('/:id',bookController.deleteBooks);
router.put('/:id', bookController.updateBook);

module.exports = router;