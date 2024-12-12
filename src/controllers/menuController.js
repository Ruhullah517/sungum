const Menu = require('../models/menuModel');

exports.getMenuByType = async (req, res) => {
  try {
    const menus = await Menu.getAllByType(req.params.type);
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const menuId = await Menu.create(req.body);
    res.status(201).json({ id: menuId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    await Menu.update(req.params.id, req.body);
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    await Menu.delete(req.params.id);
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
