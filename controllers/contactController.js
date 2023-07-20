const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");
//@desc Get all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async (req, res) => {
 
    const contacts=  await Contact.find({user_id:req.user._id});
  res.status(200).json(contacts);
});

//@desc create New  contacts
//@route Post /api/contacts
//@access private

const createContacts = asyncHandler(async (req, res) => {
  console.log("the request body is :", req.body);
  const { Name, Email, Mobile } = req.body;
  if (!Name || !Email || !Mobile) {
    res.status(400);
    throw new Error("Please provide a name, email and phone number!");
  }
  const contact = await Contact.create({Name,Email,Mobile,user_id:req.user._id}); 
  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update  contacts
//@route Post /api/contacts/:id
//@access  private

const UpdateContact = asyncHandler(async (req, res) => {
  
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

const updatedcontact=await Contact.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
})


  res.status(200).json(updatedcontact);
});

//@desc Delete  contacts
//@route Delete /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Contact deleted successfully" });

});


module.exports = {
  getContacts,
  createContacts,
  getContact,
  UpdateContact,
  deleteContact,
};
