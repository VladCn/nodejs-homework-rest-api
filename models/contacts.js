const fs = require('fs/promises')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (err) {
    throw new Error(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts).filter(({id}) => id === contactId);
  } catch (err) {
    throw new Error(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);

    const parsedContacts = JSON.parse(contacts);
    const data = parsedContacts.filter(({id}) => id !== String(contactId));

    if (parsedContacts.length !== data.length) {
      await fs.writeFile(contactsPath, JSON.stringify(data));

      return true;
    }

    return false;

  } catch(err) {
    throw new Error(err);
  }
}

const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await fs.readFile(contactsPath);

    const newItem = {id: uuidv4(), name, email, phone};
    const data = [...JSON.parse(contacts), newItem ];

    await fs.writeFile(contactsPath, JSON.stringify(data))

    return newItem;

  } catch (err) {
    throw new Error(err)
  }
}

const updateContact = async (contactId, { name, email, phone }) => {
  let target = null;

  try {
    const contacts = await fs.readFile(contactsPath);

    const updatedContacts = JSON.parse(contacts).map(item => {
      if (item.id === contactId) {
        const obj = {...item, ...(name && { name }), ...(email && { email }), ...(phone && { phone })};
        target = obj;

        return obj
      }
      return item
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    return target
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
