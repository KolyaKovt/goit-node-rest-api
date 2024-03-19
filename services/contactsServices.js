import { readFile, writeFile } from "fs/promises"
import path from "path"
import * as nanoid from "nanoid"

const contactsPath = path.resolve("b", "contacts.json")

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
  await writeFile(contactsPath, JSON.stringify(updatedContacts))

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

  await writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return createdObj
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
