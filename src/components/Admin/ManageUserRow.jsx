import React from "react";

const ManageUserRow = ({colaborator, setEditColaborator, deleteData}) => {
  
  let {id, email, password} = colaborator;

  return (
    <tr>
      <td>{id}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>
        <button onClick={()=>setEditColaborator(colaborator)}>Edit</button>
        <button onClick={()=>deleteData(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ManageUserRow;
