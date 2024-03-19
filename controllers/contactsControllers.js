import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js"
import contactsServices from "../services/contactsServices.js"

const getAllContacts = async (_, res) => {
  const result = await contactsServices.listContacts()

  res.json(result)
}

const getOneContact = async (req, res) => {
  const { id } = req.params
  const result = await contactsServices.getContactById(id)

  if (!result) throw HttpError(404)

  res.json(result)
}

const deleteContact = async (req, res) => {
  const { id } = req.params
  const result = await contactsServices.removeContact(id)

  if (!result) throw HttpError(404)

  res.json(result)
}

const createContact = async (req, res) => {}

const updateContact = async (req, res) => {}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
}
