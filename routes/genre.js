const router = require('express').Router();
const genreController = require('../controllers/genre');

router.get('/', genreController.list);
router.get('/:id', genreController.details);
router.post('/', genreController.create);
router.put('/:id', genreController.update);
router.delete('/:id', genreController.delete);

module.exports = router;