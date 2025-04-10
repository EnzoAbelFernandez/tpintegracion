const contactModel = require('../models/contactModel');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await contactModel.getById(req.params.id);
    if (contact) res.json(contact);
    else res.status(404).json({ error: 'Contacto no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el contacto' });
  }
};

exports.createContact = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  try {
    const newContact = await contactModel.create({ nombre, email, telefono });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear contacto' });
  }
};

exports.updateContact = async (req, res) => {
  const { nombre, email, telefono } = req.body;
  try {
    const updated = await contactModel.update(req.params.id, { nombre, email, telefono });
    if (updated) res.json({ message: 'Contacto actualizado' });
    else res.status(404).json({ error: 'Contacto no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar contacto' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await contactModel.remove(req.params.id);
    if (deleted) res.json({ message: 'Contacto eliminado' });
    else res.status(404).json({ error: 'Contacto no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
};
