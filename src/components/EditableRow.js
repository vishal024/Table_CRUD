import React from 'react';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter address"
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter phoneNumber"
          name="phoneNumber"
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter email"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button onClick={() => handleCancelClick()}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
