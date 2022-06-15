import React, { useState } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import { userToken } from "../Login/Login";
import Clientorders from "./Clientorders";

const TableRowOrders = ({ el, updateOrders }) => {
  let { client, products, id } = el;
  const [statusOrder, setStatusOrder] = useState({});

  const updateStatus = () => {
    let url = `${Api}/orders/${id}`;
    const data = {
      status: "delivered",
      dateProcessed: new Date(),
    };
    helpHttp()
    .patch(url, {body:data})
      .then((resp) => {
        setStatusOrder(resp);
        updateOrders();
      });
    console.log(statusOrder);
  };

  return (
    <>
      <tr>
        <td>{client}</td>
        <td>
          <Clientorders products={products} />
        </td>
        <td>
            <button onClick={updateStatus}>Delivered</button>
        </td>
      </tr>
    </>
  );
};

export default TableRowOrders;
