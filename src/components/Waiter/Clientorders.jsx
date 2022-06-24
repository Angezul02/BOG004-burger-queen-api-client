import React from "react";


const Clientorders = ({products}) => {

  
  let ordersclient = products?.map((entry, index) => (          
    <tr key={index}>
            <td>{entry.product.name}</td>
            <td>{entry.qty}</td>
            <td>{entry.product.price}</td>
    </tr>
  ));

        
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Qty</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>{ordersclient}</tbody>
    </table>
  );
};

export default Clientorders;