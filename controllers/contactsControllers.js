import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js"
import contactsServices from "../services/contactsServices.js"

const getAllContacts = async (_, res) => {
  const result = await contactsServices.listContacts()

  res.status(200).json(result)
}

const getOneContact = async (req, res) => {
  const { id } = req.params
  const result = await contactsServices.getContactById(id)

  if (!result) throw HttpError(404)

  res.status(200).json(result)
}

const deleteContact = async (req, res) => {
  const { id } = req.params
  const result = await contactsServices.removeContact(id)

  if (!result) throw HttpError(404)

  res.status(200).json(result)
}

const createContact = async (req, res) => {
  const { name, email, phone } = req.body

  const contact = await contactsServices.addContact(name, email, phone)

  res.status(201).json(contact)
}

const updateContact = async (req, res) => {
  const numberOfProperties = Object.keys(req.body).length

  if (numberOfProperties === 0)
    throw HttpError(400, "Body must have at least one field")

  const contact = await contactsServices.updateContact(req.params.id, req.body)

  if (!contact) throw HttpError(404)

  res.status(200).json(contact)
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
}
