
const express = require('express');
const BlogController = require('../controllers/BlogControllers');

const router = express.Router();




router.get('',BlogController.index);
router.post('',BlogController.store);
router.get('/create',BlogController.create);
router.post('/:id/delete',BlogController.destry);
router.get('/:id',BlogController.show);

module.exports = router;