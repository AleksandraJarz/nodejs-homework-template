const Contact = require("../models/contacts");

const fetchContacts = async () => {
  return Contact.find().lean();
};

const fetchContactById = (id) => {
  return Contacts.findById({ _id: id });
};

const insertContact = (body) => {
  return Contacts.insertOne(body);
};

module.exports = {
  fetchContacts,
  fetchContactById,
  insertContact,
};
