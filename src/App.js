import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import './style.css';
import TableData from './mockData';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

export default function App() {
  const [contacts, setContacts] = useState(TableData);

  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  // console.log(contacts)

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    //  console.log(fieldName +" and "+ fieldValue)

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    console.log('new Form data', newFormData);

    setAddFormData(newFormData);
    console.log('add Form data', addFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    console.log('Edit Form data', newFormData);

    setEditFormData(newFormData);
    console.log('Edit Form data', editFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    console.log('submit new Contact', newContact);

    const newContacts = [...contacts, newContact];
    console.log('submit new Contacts Array', newContacts);

    setContacts(newContacts);
    console.log('Contacts after submitting the form ', contacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
    console.log('Form data when click on Edit button', editFormData);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };


  const handleDeleteClick = (contactId) =>{

    const newContacts = [ ...contacts ];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index,1);
    setContacts(newContacts);
  }


  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Add a contact</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="fullName"
            required="required"
            placeholder="Enter a name"
            onChange={handleAddFormChange}
          />

          <input
            type="text"
            name="address"
            required="required"
            placeholder="Enter address"
            onChange={handleAddFormChange}
          />

          <input
            type="text"
            name="phoneNumber"
            required="required"
            placeholder="Enter phone Number"
            onChange={handleAddFormChange}
          />

          <input
            type="text"
            name="email"
            required="required"
            placeholder="Enter a email"
            onChange={handleAddFormChange}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
