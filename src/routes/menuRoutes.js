const express = require('express');
const router = express.Router();
const { getMenuByType, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

router.get('/:type', getMenuByType); // 'type' can be 'hotel' or 'event'
router.post('/', addMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
