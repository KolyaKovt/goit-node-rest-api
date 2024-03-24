import Contact from "../models/contactsModel.js"

async function listContacts() {
  const res = await Contact.find({})
  return res
}

async function getContactById(contactId) {
  const res = await Contact.findById(contactId)
  return res
}

async function removeContact(contactId) {
  const res = await Contact.findByIdAndDelete(contactId)
  return res
}

async function addContact(contactData) {
  const contact = await Contact.create(contactData)
  return contact
}

const updateContact = async (id, contactData) => {
  const contact = await Contact.findByIdAndUpdate(id, contactData)
  return contact
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
