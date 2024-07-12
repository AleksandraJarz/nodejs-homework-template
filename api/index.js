const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  addContact,
  putContact,
} = require("../controllers/index");

router.get("/controllers", getContacts);

module.exports = router;
