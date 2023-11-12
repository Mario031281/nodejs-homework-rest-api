const Contact = require("../models/contacts");
const contactSchema = require("../schemas/contacts");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res) {
  const contact = contactSchema.validate({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });
  try {
    const result = await Contact.create(contact);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = contactSchema.validate({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.json({ contactId });
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
