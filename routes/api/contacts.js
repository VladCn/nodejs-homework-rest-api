const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const { requiredSchema, partialSchema} = require('../../utils')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const list = await listContacts();

    res.status(200).json({ list })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const list = await getContactById(req.params.contactId);

    if (!list.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ list });

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).json({message: 'Required fields are missing'});
  }

  const { error } = requiredSchema.validate(req.body);

  if (error?.message) {
    return res.status(400).json({message: error.message});
  }

  try {
    const contact = await addContact(req.body);

    res.status(201).json({contact});
  } catch (err) {
    res.status(500).json({message: err.message});
  }



})

router.delete('/:contactId', async (req, res) => {
  try {
    const isDeleted = await removeContact(req.params.contactId);

    if (isDeleted) {
      return res.status(200).json({message: "contact deleted"})
    }
    res.status(404).json({message: "Not found"})

  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

router.put('/:contactId', async (req, res) => {
  if (!req.body) {
    res.status(400).json({message: 'Required fields are missing'});
  }

  const { error } = partialSchema.validate(req.body);

  if (error?.message) {
    return res.status(400).json({message: error.message});
  }

  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (contact) {
      return res.status(200).json({ contact })
    }
    res.status(404).json({message: "Not found"})

  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

module.exports = router
