import React, { useState, useEffect } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import { userToken } from "../Login/Login";
import Clientorders from "../Waiter/Clientorders";

const CookTableRowOrders = ({ el, updateOrders }) => {
  let { client, products, id } = el;
  const [statusOrder, setStatusOrder] = useState({});

  const updateStatus = () => {
    let url = `${Api}/orders/${id}`;
    const data = {
      status: "delivering",
      dateProcessed: new Date(),
    };
    helpHttp()
    .patch(url, {body:data})
      .then((resp) => {
        setStatusOrder(resp);
        updateOrders();
      });
  };


  return (
    <>
      <tr>
        <td>{client}</td>
        <td>
          <Clientorders products={products} />
        </td>
        <td>
          <button onClick={updateStatus}>Send to Waiter</button>
        </td>
      </tr>
    </>
  );
};

export default CookTableRowOrders;
