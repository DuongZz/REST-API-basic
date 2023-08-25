const bookController = require('../controllers/bookController');
const router = require('express').Router();

router.post('/:id/borrow', bookController.borrowBook);
router.post('/:id/return', bookController.returnBook);
router.delete('/:id',bookController.deleteBooks);
router.put('/:id', bookController.updateBook);
router.post('/', bookController.addBook);



module.exports = router;