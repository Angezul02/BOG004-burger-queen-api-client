import React from 'react'
import ManageUserRow from './ManageUserRow'
import '../../assets/css/TableOrders.css'

const ManageUsers = ({colaborators, setEditColaborator, deleteData}) => {


  return (
    <>
        <h3 className='Title'>Manage Users</h3>
        <table className='Table-order'>
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {colaborators.length === 0 ? <tr><td colSpan='3'> Not data</td></tr> : colaborators.map((colaborator, index) => <ManageUserRow 
                key={index} 
                colaborator={colaborator}
                setEditColaborator={setEditColaborator}
                deleteData={deleteData}/>) }
            </tbody>
        </table>
    </>
  )
}

export default ManageUsers