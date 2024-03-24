import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js"
import contactsServices from "../services/contactsServices.js"

const getAllContacts = async (_, res) => {
  const result = await contactsServices.listContacts()

  res.status(200).json(result)
}

const getOneContact = async (req, res) => {
  const result = await contactsServices.getContactById(req.params.id)

  if (!result) throw HttpError(404)

  res.status(200).json(result)
}

const deleteContact = async (req, res) => {
  const result = await contactsServices.removeContact(req.params.id)

  if (!result) throw HttpError(404)

  res.status(204).json(result)
}

const createContact = async (req, res) => {
  const contact = await contactsServices.addContact(req.body)

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

const updateStatusContact = async (req, res) => {
  const contact = await contactsServices.updateContact(
    req.params.contactId,
    req.body
  )

  if (!contact) throw HttpError(404)

  res.status(200).json(contact)
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}
