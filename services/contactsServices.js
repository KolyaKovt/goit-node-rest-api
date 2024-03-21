import { readFile, writeFile } from "fs/promises"
import path from "path"
import { nanoid } from "nanoid"

const contactsPath = path.resolve("db", "contacts.json")

const updateContacts = async contacts => {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

async function listContacts() {
  const res = await readFile(contactsPath, "utf8")
  const contacts = JSON.parse(res)
  return contacts
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const filteredContacts = contacts.filter(contact => {
    return contact.id === contactId
  })

  if (filteredContacts.length !== 0) return filteredContacts[0]

  return null
}

async function removeContact(contactId) {
  const contactToRemove = await getContactById(contactId)

  const contacts = await listContacts()
  const updatedContacts = contacts.filter(contact => {
    return contact.id !== contactId
  })

  await updateContacts(updatedContacts)

  return contactToRemove
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()

  const id = nanoid()
  const createdObj = {
    id,
    name,
    email,
    phone,
  }

  contacts.push(createdObj)

  await updateContacts(contacts)

  return createdObj
}

const updateContact = async (id, contactData) => {
  const contacts = await listContacts()

  let updatedContact = null

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      updatedContact = { ...contacts[i], ...contactData }
      contacts[i] = updatedContact
      console.log(updateContact)
      break
    }
  }

  await updateContacts(contacts)

  return updatedContact
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
