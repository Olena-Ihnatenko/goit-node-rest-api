// import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";
import Joi from "joi";

async function getAllContacts(req, res, next) {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getOneContact(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  // Add Joi here
  const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  const { error } = createContactSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  // const contact = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   favorite: req.body.favorite,
  // };

  try {
    const result = await Contact.create(req.body);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}


async function updateContact(req, res, next) {
  // Add Joi here
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });

  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }


  try {
    const { id } = req.params;

    //   const contact = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   phone: req.body.phone,
    //   favorite: req.body.favorite,
    // };

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite: req.body.favorite },
      { new: true }
    );
    if (result === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
