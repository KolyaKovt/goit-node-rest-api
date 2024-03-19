import ctrlWrapper from "../decorators/ctrlWrapper.js"
import contactsService from "../services/contactsServices.js"

export const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts()

  res.json(result)
}

export const getOneContact = async (req, res) => {}

export const deleteContact = async (req, res) => {}

export const createContact = async (req, res) => {}

export const updateContact = async (req, res) => {}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
}
