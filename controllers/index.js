const {
  fetchContacts,
  fetchContactById,
  insertContact,
} = require("../controllers/service");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await fetchContactById(req.params.id);
    if (contact) {
      res.json({
        ...contact.toObject(),
        html: contact.htmlify(),
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (res, req, next) => {
  try {
    const result = await insertContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const putContact = (res, req, next) => {
  console.log(req.params.id);
  console.log(req.params.body);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  putContact,
};
