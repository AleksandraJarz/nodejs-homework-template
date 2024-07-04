const express = require("express");
const joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

const schema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "any.required": "Missing required name field",
  }),
  email: joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Email must be a valid email address",
  }),
  phone: joi.string().min(9).required().messages({
    "any.required": "Missing required phone field",
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      console.log(contact);
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const errorJoi = schema.validate(req.body);
    if (errorJoi.error) {
      console.log(
        res.status(400).json({ message: errorJoi.error.details[0].message })
      );
      return res
        .status(400)
        .json({ message: errorJoi.error.details[0].message });
    }
    console.log("body");
    console.log(req.body);
    const contact = await addContact(req.body);
    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(404).json(contact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result === "Contact deleted") {
      res.status(200).json({ message: result });
    } else {
      res.status(404).json({ message: result });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const errorJoi = schema.validate(req.body);
    if (errorJoi.error) {
      return res
        .status(400)
        .json({ message: errorJoi.error.details[0].message });
    }
    const result = await updateContact(req.params.contactId, req.body);
    if (result === "Contact update") {
      res.status(200).json({ message: result });
    } else {
      if (result === "err") {
        res.status(404).json({ message: "missing fields" });
      } else {
        res.status(201).json({ message: "Add Contact" });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
