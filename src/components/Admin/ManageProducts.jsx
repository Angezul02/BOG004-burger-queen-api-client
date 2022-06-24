import React from 'react'
import '../../assets/css/TableOrders.css'
import ManageProductRow from './ManageProductRow'

const ManageProducts = ({products, setEditProduct, deleteProducts}) => {

  return (
   <>
    <h3 className='Title'>Manage Products</h3>
    <table className='Table-order'>
        <thead>
            <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {products.length === 0 ? <tr><td>Not Products </td></tr> : products.map((product, index) => <ManageProductRow
            key={index}
            product={product}
            setEditProduct={setEditProduct}
            deleteProducts={deleteProducts}
            />)}
        </tbody>
    </table>
   </>
  )
}

export default ManageProducts